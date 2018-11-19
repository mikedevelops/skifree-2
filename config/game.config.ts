export interface IGameConfig {
    WIDTH: number;
    HEIGHT: number;
    FPS: number;
    MIN_PLAYERS: number;
    MAX_PLAYERS: number;
    YETI: {
        SPEED: number;
        SPEED_FALLOFF: number,
        MAX_SPEED: number
    };
    SKIER: {
        SPEED: number;
        SPEED_FALLOFF: number;
        MAX_SPEED: number,
        VALUE: number
    };
    UI: {
        SPEED_BAR: {
            WIDTH: number
        }
    };
    RESOLUTION: number;
    STATE: {
        SKIING: {
            TRANSITION_FRAMES: number
        }
    };
}

const config: IGameConfig = {
    WIDTH: 512,
    HEIGHT: 512,
    FPS: 12,
    MIN_PLAYERS: 2,
    MAX_PLAYERS: 16,
    YETI: {
        SPEED: 4,
        SPEED_FALLOFF: 0.005,
        MAX_SPEED: 5
    },
    SKIER: {
        SPEED: 0.75,
        SPEED_FALLOFF: 0,
        MAX_SPEED: 5,
        VALUE: 0.25
    },
    UI: {
        SPEED_BAR: {
            WIDTH: 250
        }
    },
    RESOLUTION: 1,
    STATE: {
        SKIING: {
            TRANSITION_FRAMES: 200
        }
    }
};

export default config;
