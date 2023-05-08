import {css} from "styled-components";

export const lightColorTheme = {
    body: '#E5E5E5',
    settings: {
        window: {
            backgroundColor: '#E5E5E5'
        }
    },
    contactUsPopup: {
        content: {
            backgroundColor: '#F2F2F2EA',
            textColor: '#484848',
        },
        closeButton: {
            textColor: '#4a4a4a',
            textColorHover: '#828282',
        },
        overlay: {
            color: '#00000033'
        },
        logo: {
            filter: css`drop-shadow(0 1px 1px #0000007F)`
        }
    },
    input: {
        label: {
            textColor: '#5B86E5'
        }
    },
    teamLogo: {
        filter: css`drop-shadow(0 24px 28px #69696926)`,
        filterHover: css`drop-shadow(0 24px 28px #3F3E3E44)`,
    },
    scrollbar: {
        track: '#cfcfcf',
        thumb: '#9f9f9f',
        thumbHover: '#808080'
    },
    sidebar: {
        icon: {
            filter: 'drop-shadow(0px 0px 10px rgba(50, 50, 50, 0.5))'
        }
    },
    blue: {
        level1: '#6594ff',
        level2: '#5f87e1',
        level3: '#5376c5',
        transparent: {
            level1: '#6594FFCC'
        }
    },
    gray: {
        level1: '#efefef',
        level2: '#e1e1e1',
        level3: '#cdcdcd',
        level4: '#dcdcdc',
        level5: '#464646',
        transparent: {
            level1: '#00000007',
            level2: '#00000013',
            level3: '#0000001F',
            level4: '#0000003F'
        }
    },
    red: {
        level1: '#ee7373',
        level2: '#da6f6f',
        level3: '#ce6161'
    },
    green: {
        level1: '#73ee73',
        level2: '#6fda6f',
        level3: '#61ce61'
    }
};