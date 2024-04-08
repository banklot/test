import {toRefs, reactive, computed} from 'vue';

const contextPath = import.meta.env.BASE_URL;

const layoutConfig = reactive({
    ripple: false,
    darkTheme: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    cartMode: 'static',
    theme: 'light',
    scale: 14,
    activeMenuItem: null
});

const layoutState = reactive({
    staticMenuDesktopActive: (window.innerWidth > 991),
    staticMenuMobileActive: false,
    staticCartDesktopActive: (window.innerWidth > 991),
    staticCartMobileActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    menuHoverActive: false
});

export function useLayout() {
    const changeThemeSettings = (theme, darkTheme) => {
        layoutConfig.darkTheme = darkTheme;
        layoutConfig.theme = theme;
    };

    const setScale = (scale) => {
        layoutConfig.scale = scale;
    };

    const setActiveMenuItem = (item) => {
        layoutConfig.activeMenuItem = item.value || item;
    };

    const onMenuToggle = () => {
        if (window.innerWidth > 991) {
            layoutState.staticMenuDesktopActive = !layoutState.staticMenuDesktopActive;
        } else {
            layoutState.staticMenuMobileActive = !layoutState.staticMenuMobileActive;
        }
    };

    const onCartToggle = () => {
        if (window.innerWidth > 991) {
            layoutState.staticCartDesktopActive = !layoutState.staticCartDesktopActive;
        } else {
            layoutState.staticCartMobileActive = !layoutState.staticCartMobileActive;
        }
    }

    const isSidebarActive = computed(() => layoutState.staticMenuDesktopActive || layoutState.staticMenuMobileActive);
    const isCartActive = computed(() => layoutState.staticCartDesktopActive || layoutState.staticCartMobileActive);

    const isDarkTheme = computed(() => layoutConfig.darkTheme);

    return {
        contextPath,
        layoutConfig: toRefs(layoutConfig),
        layoutState: toRefs(layoutState),
        changeThemeSettings,
        setScale,
        onMenuToggle,
        onCartToggle,
        isSidebarActive,
        isCartActive,
        isDarkTheme,
        setActiveMenuItem
    };
}
