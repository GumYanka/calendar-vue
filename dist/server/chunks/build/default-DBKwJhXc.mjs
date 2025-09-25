import { h as __nuxt_component_0, _ as _export_sfc } from './server.mjs';
import { defineComponent, withCtx, createVNode, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:url';
import '@iconify/utils';
import 'node:crypto';
import 'consola';
import 'node:path';
import 'pinia';
import 'vue-router';
import '@iconify/vue';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    activeItem: {}
  },
  emits: ["update:activeItem"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const menu = [
      { title: "Home", icon: "home", to: "/home" },
      { title: "Dashboard", icon: "dashboard", to: "/dashboard" },
      { title: "Inbox", icon: "email", to: "/inbox" },
      { title: "Products", icon: "inventory_2", to: "/products" },
      { title: "Invoices", icon: "receipt_long", to: "/invoices" },
      { title: "Customers", icon: "groups", to: "/customers" },
      { title: "Chat Room", icon: "chat", to: "/chat" },
      { title: "Calendar", icon: "calendar_today", to: "/" },
      { title: "Help Center", icon: "help", to: "/help" },
      { title: "Settings", icon: "settings", to: "/settings" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "w-56 bg-gray-600 text-white flex-shrink-0" }, _attrs))} data-v-12ba94fc><div class="border-t bg-gray-700 p-5 text-l font-bold tracking-widest" data-v-12ba94fc> IMPEKABLE </div><nav class="mt-2" data-v-12ba94fc><ul data-v-12ba94fc><!--[-->`);
      ssrRenderList(menu, (item) => {
        _push(`<li class="${ssrRenderClass([
          "flex items-center gap-3 px-4 py-4 border-l-2 cursor-pointer",
          props.activeItem === item.to ? "border-l-cyan-400 bg-gray-700 text-cyan-400" : "border-l-2 border-gray-600 hover:border-l-cyan-400 hover:bg-gray-700 hover:text-cyan-400"
        ])}" data-v-12ba94fc><span class="material-icons" data-v-12ba94fc>${ssrInterpolate(item.icon)}</span><span data-v-12ba94fc>${ssrInterpolate(item.title)}</span></li>`);
      });
      _push(`<!--]--></ul></nav></aside>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Sidebar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Sidebar = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-12ba94fc"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  props: {
    username: {},
    avatarUrl: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between bg-white shadow px-6 h-16" }, _attrs))} data-v-d1fcbec1><div class="flex-1 max-w-md relative" data-v-d1fcbec1><input type="text" placeholder="Search transactions, invoices or help" class="w-full px-3 py-2 pl-10 rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400" data-v-d1fcbec1><span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 material-icons" data-v-d1fcbec1>search</span></div><div class="flex items-center gap-4 ml-6" data-v-d1fcbec1><button class="p-2 text-gray-400 hover:text-cyan-500" data-v-d1fcbec1><span class="material-icons" data-v-d1fcbec1>notifications</span></button><button class="p-2 text-gray-400 hover:text-cyan-500" data-v-d1fcbec1><span class="material-icons" data-v-d1fcbec1>email</span></button><button class="p-2 text-gray-400 hover:text-cyan-500" data-v-d1fcbec1><span class="material-icons" data-v-d1fcbec1>location_on</span></button><div class="h-6 border-l border-gray-300" data-v-d1fcbec1></div><div class="flex items-center gap-2" data-v-d1fcbec1><span class="text-gray-600 font-medium mr-4" data-v-d1fcbec1>${ssrInterpolate(_ctx.username)}</span><img${ssrRenderAttr("src", _ctx.avatarUrl)} alt="User" class="w-8 h-8 rounded-full" data-v-d1fcbec1></div></div></header>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Header.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d1fcbec1"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  __ssrInlineRender: true,
  setup(__props) {
    const activeItem = ref("/");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen bg-gray-100" }, _attrs))}>`);
      _push(ssrRenderComponent(Sidebar, {
        activeItem: activeItem.value,
        "onUpdate:activeItem": ($event) => activeItem.value = $event
      }, null, _parent));
      _push(`<div class="flex-1 flex flex-col">`);
      _push(ssrRenderComponent(Header, {
        username: "John Doe",
        avatarUrl: "https://randomuser.me/api/portraits/men/85.jpg"
      }, null, _parent));
      _push(`<main class="flex-1 p-6 overflow-auto">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Layout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = __nuxt_component_0;
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-DBKwJhXc.mjs.map
