module COLLADA.Converter {

    export interface Option {
        value: any;
        description: string;
    }

    export class OptionBool implements Option {
        value: boolean;
        description: string;

        constructor(defaultValue: boolean, description: string) {
            this.value = defaultValue;
            this.description = description;
        }
    }

    export class OptionFloat implements Option {
        value: number;
        min: number;
        max: number;
        description: string;

        constructor(defaultValue: number, min: number, max: number, description: string) {
            this.value = defaultValue;
            this.min = min;
            this.max = max;
            this.description = description;
        }
    }

    export class OptionSelect implements Option {
        value: string;
        description: string;
        options: string[]

        constructor(defaultValue: string, options: string[], description: string) {
            this.value = defaultValue;
            this.options = options;
            this.description = description;
        }
    }

    export class OptionArray<T> implements Option {
        value: T[];
        description: string;

        constructor(defaultValue: T[], description: string) {
            this.value = defaultValue;
            this.description = description;
        }
    }

    export class Options {
        singleAnimation: OptionBool;
        singleGeometry: OptionBool;
        singleBufferPerGeometry: OptionBool;
        enableAnimations: OptionBool;
        useAnimationLabels: OptionBool;
        enableExtractGeometry: OptionBool;
        enableResampledAnimations: OptionBool;
        animationLabels: OptionArray<COLLADA.Converter.AnimationLabel>;
        animationFps: OptionFloat;
        removeConstAnimationTracks: OptionBool;
        applyBindShape: OptionBool;
        removeTexturePath: OptionBool;
        sortBones: OptionBool;
        worldTransform: OptionBool;
        worldTransformBake: OptionBool;
        worldTransformScale: OptionFloat;
        worldTransformRotationAxis: OptionSelect;
        worldTransformRotationAngle: OptionFloat;

        constructor() {
            this.singleAnimation = new OptionBool(true,
                "If enabled, all animations are merged into a single animation. Enable if each bone has a separate top level animation.");
            this.singleGeometry = new OptionBool(true,
                "If enabled, all geometries are merged into a single geometry. Only has an effect if 'extractGeometry' is enabled.");
            this.singleBufferPerGeometry = new OptionBool(false,
                "If enabled, all chunks within one geometry use one set of vertex buffers, each chunk occupying a different part of each buffer.");
            this.enableAnimations = new OptionBool(true,
                "If enabled, animations are exported. Otherwise, all animations are ignored.");
            this.enableExtractGeometry = new OptionBool(true,
                "If enabled, extracts all geometries from the scene and detaches them from their scene graph nodes. Otherwise, geometries remain attached to nodes.");
            this.enableResampledAnimations = new OptionBool(true,
                "If enabled, generates resampled animations for all skeleton bones.");
            this.useAnimationLabels = new OptionBool(false,
                "If enabled, animations labels are used to split the global animation into separete animations.");
            this.animationLabels = new OptionArray<COLLADA.Converter.AnimationLabel>([],
                "An array of animation labels ({name, begin, end, fps)} that describes how the global animation is split. Only has an effect if 'useAnimationLabels' is enabled.");
            this.animationFps = new OptionFloat(10, 0, 100,
                "Default FPS for resampled animations.");
            this.removeConstAnimationTracks = new OptionBool(true,
                "If enabled, animation tracks are removed if they only contain the rest pose transformation for all times.");
            this.applyBindShape = new OptionBool(true,
                "If enabled, the positions and normals of skin-animated meshes are pre-multiplied by the bind shape matrix.");
            this.removeTexturePath = new OptionBool(true,
                "If enabled, only the filename and extension of textures are kept and the remaining path is discarded.");
            this.sortBones = new OptionBool(true,
                "If enabled, bones are sorted so that child bones always appear after their parent bone in the list of bones.");
            this.worldTransform = new OptionBool(false,
                "If enabled, all objects (geometries, animations, skeletons) are transformed as specified by the corresponding options.");
            this.worldTransformBake = new OptionBool(true,
                "If enabled, the world tranformation is applied to all scene nodes. Otherwise, it is applied to the scene root only.");
            this.worldTransformScale = new OptionFloat(1.0, 1e-6, 1e6,
                "Scale factor. See the 'worldTransform' option.");
            this.worldTransformRotationAxis = new OptionSelect("none", ["none", "x", "y", "z"],
                "Rotation axis. See the 'worldTransform' option.");
            this.worldTransformRotationAngle = new OptionFloat(0, 0, 360,
                "Rotation angle (in degrees). See the 'worldTransform' option.");
        }

    }
}