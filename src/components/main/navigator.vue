<template>
<div class="navigator">
  <div class="nav-bar">
    <div class="nav-btn zoom-in" @click="zoomIn" :title="t('minder.main.navigator.amplification')" :class="{ 'active' : zoomRadioIn }">
      <div class="icon"></div>
    </div>
    <div class="zoom-pan" ref="zoomPan">
      <div class="origin" :style="{'transform': 'translate(0, ' + getHeight(100) + 'px)'}" @click="RestoreSize"></div>
      <div class="indicator" :style="{
                 'transform': 'translate(0, ' + getHeight(this.zoom) + 'px)',
                 'transition': 'transform 200ms'
                 }"></div>
    </div>
    <div class="nav-btn zoom-out" @click="zoomOut" :title="t('minder.main.navigator.narrow')" :class="{ 'active' : zoomRadioOut }">
      <div class="icon"></div>
    </div>
    <div class="nav-btn hand" @click="hand" :title="t('minder.main.navigator.drag')" :class="{ 'active' : enableHand }">
      <div class="icon"></div>
    </div>
    <div class="nav-btn camera" @click="locateToOrigin" :title="t('minder.main.navigator.locating_root')">
      <div class="icon"></div>
    </div>
    <div class="nav-btn nav-trigger" :class="{'active' : isNavOpen}" @click="toggleNavOpen" :title="t('minder.main.navigator.navigator')">
      <div class="icon"></div>
    </div>
  </div>
  <div class="nav-previewer" v-show="isNavOpen" ref="navPreviewer"></div>
</div>
</template>

<script>
import {getLocalStorage, setLocalStorage} from '../../script/store';
import Locale from '/src/mixins/locale';
export default {
  name: "navigator",
  mixins: [Locale],
  data() {
    return {
      zoom: 100,
      isNavOpen: true,
      $previewNavigator: "",
      paper: "",
      nodeThumb: "",
      connectionThumb: "",
      visibleRect: "",
      contentView: "",
      visibleView: "",
      pathHandler: "",
      minder: undefined,
      config: {
      // 右侧面板最小宽度
      ctrlPanelMin: 250,
        // 右侧面板宽度
        ctrlPanelWidth: parseInt(window.localStorage.__dev_minder_ctrlPanelWidth) || 250,
        // 分割线宽度
        dividerWidth: 3,
        // 默认语言
        defaultLang: 'zh-cn',
        // 放大缩小比例
        zoom: [10, 20, 30, 50, 80, 100, 120, 150, 200]
    }
    };
  },
  computed: {
    enableHand() {
      return (
        this.minder &&
        this.minder.queryCommandState &&
        this.minder.queryCommandState("hand") == 1
      );
    },
    zoomRadioIn() {
      return this.getZoomRadio(this.zoom) == 0;
    },
    zoomRadioOut() {
      return this.getZoomRadio(this.zoom) == 1;
    },
  },
  methods: {
    //避免缓存
    getNavOpenState() {
      return getLocalStorage("navigator-hidden");
    },

    zoomIn() {
      minder.execCommand("zoomIn");
    },

    RestoreSize() {
      minder.execCommand("zoom", 100);
    },

    zoomOut() {
      minder.execCommand("zoomOut");
    },

    hand() {
      minder.execCommand("hand");
    },

    getZoomRadio(value) {
      try {
        if (!minder) return false;
      } catch (e) {
        // 如果window的还没挂载minder，先捕捉undefined异常
        return false
      }
      var zoomStack = minder && minder.getOption && minder.getOption("zoom");
      if (!zoomStack) {
        return;
      }
      var minValue = zoomStack[0];
      var maxValue = zoomStack[zoomStack.length - 1];
      var valueRange = maxValue - minValue;
      return 1 - (value - minValue) / valueRange;
    },

    getHeight(value) {
      this.$nextTick(() => {
        var totalHeight = this.$refs.zoomPan.style.height;
        return this.getZoomRadio(value) * totalHeight;
      })
    },

    locateToOrigin() {
      minder.execCommand("camera", minder.getRoot(), 600);
    },

    toggleNavOpen() {
      var self = this;
      var isNavOpen = "";
      isNavOpen = !JSON.parse(self.getNavOpenState());
      setLocalStorage("navigator-hidden", isNavOpen);
      self.isNavOpen = isNavOpen;
      setTimeout(function () {
        if (self.isNavOpen) {
          self.bind();
          self.updateContentView();
          self.updateVisibleView();
        } else {
          self.unbind();
        }
      }, 100);
    },

    bind() {
      minder.on("layout layoutallfinish", this.updateContentView);
      minder.on("viewchange", this.updateVisibleView);
    },

    unbind() {
      minder.off("layout layoutallfinish", this.updateContentView);
      minder.off("viewchange", this.updateVisibleView);
    },

    getPathHandler(theme) {
      switch (theme) {
        case "tianpan":
        case "tianpan-compact":
          return function (nodePathData, x, y, width, height) {
            var r = width >> 1;
            nodePathData.push("M", x, y + r, "a", r, r, 0, 1, 1, 0, 0.01, "z");
          };
        default: {
          return function (nodePathData, x, y, width, height) {
            nodePathData.push(
              "M",
              x,
              y,
              "h",
              width,
              "v",
              height,
              "h",
              -width,
              "z"
            );
          };
        }
      }
    },

    updateContentView() {
      var self = this;
      var view = minder.getRenderContainer().getBoundaryBox();
      self.contentView = view;
      var padding = 30;
      self.paper.setViewBox(
        view.x - padding - 0.5,
        view.y - padding - 0.5,
        view.width + padding * 2 + 1,
        view.height + padding * 2 + 1
      );
      var nodePathData = [];
      var connectionThumbData = [];
      minder.getRoot().traverse(function (node) {
        var box = node.getLayoutBox();
        self.pathHandler(nodePathData, box.x, box.y, box.width, box.height);
        if (node.getConnection() && node.parent && node.parent.isExpanded()) {
          connectionThumbData.push(node.getConnection().getPathData());
        }
      });
      self.paper.setStyle("background", minder.getStyle("background"));
      if (nodePathData.length) {
        self.nodeThumb
          .fill(minder.getStyle("root-background"))
          .setPathData(nodePathData);
      } else {
        self.nodeThumb.setPathData(null);
      }
      if (connectionThumbData.length) {
        self.connectionThumb
          .stroke(minder.getStyle("connect-color"), "0.5%")
          .setPathData(connectionThumbData);
      } else {
        self.connectionThumb.setPathData(null);
      }
      self.updateVisibleView();
    },

    updateVisibleView() {
      this.visibleView = minder.getViewDragger().getView();
      this.visibleRect.setBox(this.visibleView.intersect(this.contentView));
    },
  },

  mounted() {
    var self = this;
    this.$nextTick(() => {
      this.minder = minder;
      // 以下部分是缩略图导航器
      self.$previewNavigator = this.$refs.navPreviewer;

      // 画布，渲染缩略图
      self.paper = new kity.Paper(self.$previewNavigator);

      // 用两个路径来挥之节点和连线的缩略图
      self.nodeThumb = self.paper.put(new kity.Path());
      self.connectionThumb = self.paper.put(new kity.Path());

      // 表示可视区域的矩形
      self.visibleRect = self.paper.put(
        new kity.Rect(100, 100).stroke("red", "1%")
      );
      self.contentView = new kity.Box();
      self.visibleView = new kity.Box();

      self.pathHandler = self.getPathHandler(minder.getTheme());
      minder.setDefaultOptions({
        zoom: self.config.zoom,
      });

      minder &&
      minder.on("zoom", function (e) {
        self.zoom = e.zoom;
      });
      if (self.isNavOpen) {
        self.bind();
        self.updateContentView();
        self.updateVisibleView();
      } else {
        self.unbind();
      }
      // 主题切换事件
      minder.on("themechange", function (e) {
        this.pathHandler = self.getPathHandler(e.theme);
      });

      navigate();

      function navigate() {
        function moveView(center, duration) {
          let box = self.visibleView;
          center.x = -center.x;
          center.y = -center.y;
          let viewMatrix = minder.getPaper().getViewPortMatrix();
          box = viewMatrix.transformBox(box);
          let targetPosition = center.offset(box.width / 2, box.height / 2);
          minder.getViewDragger().moveTo(targetPosition, duration);
        }
        let dragging = false;
        self.paper.on("mousedown", function (e) {
          dragging = true;
          moveView(e.getPosition("top"), 200);
          self.$previewNavigator.classList.add("grab");
        });
        self.paper.on("mousemove", function (e) {
          if (dragging) {
            moveView(e.getPosition("top"));
          }
        });

        self.paper.on("mouseup", function (e) {
          dragging = false;
          self.$previewNavigator && self.$previewNavigator.classList.remove("grab");
        });
      }
    })
  },
};
</script>
<style scoped>
.nav-btn .icon {
  background: url("../../assets/minder/icons.png");
}
</style>
