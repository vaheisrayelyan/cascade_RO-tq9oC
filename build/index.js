System.register(['rodin/core', './src/Screen.js', './src/Socket.js'], function (_export, _context) {
    "use strict";

    var RODIN, screen, changeEnvSocket;
    return {
        setters: [function (_rodinCore) {
            RODIN = _rodinCore;
        }, function (_srcScreenJs) {
            screen = _srcScreenJs.screen;
        }, function (_srcSocketJs) {
            changeEnvSocket = _srcSocketJs.default;
        }],
        execute: function () {

            RODIN.start();

            var textureScene1 = RODIN.Loader.loadTexture('images/scene1.jpg');
            var textureScene2 = RODIN.Loader.loadTexture('images/scene2.jpg');
            var stImage1 = RODIN.Loader.loadTexture("images/story1_1.jpg");
            var stImage2 = RODIN.Loader.loadTexture("images/story1_2.jpg");
            var stImage3 = RODIN.Loader.loadTexture("images/story1_3.jpg");
            var stImage4 = RODIN.Loader.loadTexture("images/story1_4.jpg");
            var oldImage = RODIN.Loader.loadTexture("images/old_abo.png");
            //var textureScene3 = RODIN.Loader.loadTexture('images/scene3.jpg');

            var existingStory = null;
            var existingAnim = null;
            var startAnim = 1;

            let player = new RODIN.MaterialPlayer({
                HD: "videos/video.mp4",
                SD: "videos/video.mp4",
                default: "HD"
            });

            const bufferingParams = { name: "buffering", width: 0.4, height: 0.4 };

            bufferingParams.background = { color: 0x666666, opacity: 0.3 };
            bufferingParams.border = { radius: 0.25, width: 0.01, color: 0xffffff };
            bufferingParams.label = {
                text: "loading",
                fontSize: 0.07,
                color: 0xffffff,
                position: { h: 50, v: 50 }
            };

            const bufferEl = new RODIN.Element(bufferingParams);

            bufferEl.on(RODIN.CONST.READY, evt => {
                evt.target.position.set(0, 1.6, -2);
                player.onBufferStart = () => {
                    RODIN.Scene.active.add(evt.target);
                };
                player.onBufferEnd = () => {
                    RODIN.Scene.active.remove(evt.target);
                };
            });

            const exp360_scene1 = new RODIN.Sculpt();
            const exp360_scene2 = new RODIN.Sculpt();
            const exp360_scene3 = new RODIN.Sculpt();

            const scene1 = new RODIN.Sphere(72, 720, 4, new THREE.MeshBasicMaterial({
                map: textureScene1,
                side: THREE.DoubleSide
            }));

            const scene2 = new RODIN.Sphere(72, 720, 4, new THREE.MeshBasicMaterial({
                map: textureScene2,
                side: THREE.DoubleSide
            }));

            // const scene3 = new RODIN.Sphere(72, 720, 4,
            //     new THREE.MeshBasicMaterial({
            //         map: textureScene3,
            //         side: THREE.DoubleSide
            //     }));

            exp360_scene1.add(scene1);
            exp360_scene2.add(scene2);
            //exp360_scene3.add(scene3);

            var videoframe = new RODIN.Plane(10, 6.67, new THREE.MeshBasicMaterial({
                side: THREE.DoubleSide,
                map: RODIN.Loader.loadTexture("videos/cover.jpg")
            }));
            videoframe.on(RODIN.CONST.READY, function (e) {
                e.target.scale.x = 0.001;
                e.target.scale.y = 0.001;
                e.target.scale.z = 0.001;
            });
            videoframe.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, evt => {
                if (!player.hasStarted) {
                    videoframe._threeObject.material.map = player.getTexture();
                    player.hasStarted = true;
                }
                if (existingAnim != 'video') {
                    changeThumbs(null, 'video', videoframe, null);
                }
                player.playPause();
            });
            RODIN.Scene.active.preRender(() => {
                player.update(RODIN.Time.delta);
            });
            //

            var hotspot1 = new RODIN.Plane(10, 5.55, new THREE.MeshBasicMaterial({
                map: RODIN.Loader.loadTexture("images/hotspot.png"),
                transparent: true
            }));

            var hotspot2 = new RODIN.Plane(10, 5.55, new THREE.MeshBasicMaterial({
                map: RODIN.Loader.loadTexture("images/hotspot.png"),
                transparent: true
            }));

            var story1 = new RODIN.Plane(3, 3, new THREE.MeshBasicMaterial({
                map: RODIN.Loader.loadTexture("images/eye.png"),
                transparent: true,
                opacity: 1.0
            }));

            var oldStreetView = new RODIN.Plane(28.8, 20.2464, new THREE.MeshBasicMaterial({
                map: oldImage,
                transparent: true,
                opacity: 0
            }));

            var story1_1 = new RODIN.Plane(10, 6.67, new THREE.MeshBasicMaterial({
                map: stImage1,
                transparent: true,
                opacity: 1
            }));
            story1_1.on(RODIN.CONST.READY, function (e) {
                e.target.scale.x = 0.001;
                e.target.scale.y = 0.001;
                e.target.scale.z = 0.001;
            });

            var story1_2 = new RODIN.Plane(10, 6.67, new THREE.MeshBasicMaterial({
                map: stImage2,
                transparent: true,
                opacity: 1
            }));
            story1_2.on(RODIN.CONST.READY, function (e) {
                e.target.scale.x = 0.001;
                e.target.scale.y = 0.001;
                e.target.scale.z = 0.001;
            });

            var story1_3 = new RODIN.Plane(10, 6.67, new THREE.MeshBasicMaterial({
                map: stImage3,
                transparent: true,
                opacity: 1
            }));
            story1_3.on(RODIN.CONST.READY, function (e) {
                e.target.scale.x = 0.001;
                e.target.scale.y = 0.001;
                e.target.scale.z = 0.001;
            });

            var story1_4 = new RODIN.Plane(10, 6.67, new THREE.MeshBasicMaterial({
                map: stImage4,
                transparent: true,
                opacity: 1
            }));
            story1_4.on(RODIN.CONST.READY, function (e) {
                e.target.scale.x = 0.001;
                e.target.scale.y = 0.001;
                e.target.scale.z = 0.001;
            });

            let oldStreetViewHolder = new RODIN.Sculpt();
            exp360_scene1.add(oldStreetViewHolder);
            oldStreetViewHolder.add(oldStreetView);
            oldStreetViewHolder.rotation.y = Math.PI / 2.2;
            oldStreetView.position.set(0, 5.6, -31);

            let story1_1Holder = new RODIN.Sculpt();
            exp360_scene1.add(story1_1Holder);
            story1_1Holder.add(story1_1);
            story1_1Holder.rotation.y = Math.PI / 2.2;
            story1_1.position.set(0, 3.8, -22);

            let story1_2Holder = new RODIN.Sculpt();
            exp360_scene1.add(story1_2Holder);
            story1_2Holder.add(story1_2);
            story1_2Holder.rotation.y = Math.PI / 2.2;
            story1_2.position.set(0, 3.8, -22);

            let story1_3Holder = new RODIN.Sculpt();
            exp360_scene1.add(story1_3Holder);
            story1_3Holder.add(story1_3);
            story1_3Holder.rotation.y = Math.PI / 2.2;
            story1_3.position.set(0, 3.8, -22);

            let story1_4Holder = new RODIN.Sculpt();
            exp360_scene1.add(story1_4Holder);
            story1_4Holder.add(story1_4);
            story1_4Holder.rotation.y = Math.PI / 2.2;
            story1_4.position.set(0, 3.8, -22);

            let videoHolder = new RODIN.Sculpt();
            exp360_scene1.add(videoHolder);
            videoHolder.add(videoframe);
            videoHolder.rotation.y = Math.PI / 2.2;
            videoframe.position.set(0, 3.8, -22);

            let hotspot1Holder = new RODIN.Sculpt();
            exp360_scene1.add(hotspot1Holder);
            hotspot1Holder.add(hotspot1);
            hotspot1Holder.rotation.y = Math.PI / 2.2;
            hotspot1.position.set(0, -20, -36);
            hotspot1.rotation.x = -Math.PI / 2;
            hotspot1.rotation.z = -Math.PI / 10;

            let hotspot2Holder = new RODIN.Sculpt();
            exp360_scene2.add(hotspot2Holder);
            hotspot2Holder.add(hotspot2);
            hotspot2Holder.rotation.y = Math.PI;
            hotspot2.position.set(0, -20, -36);
            hotspot2.rotation.x = -Math.PI / 2;
            hotspot2.rotation.z = -Math.PI / 10;

            let story1Holder = new RODIN.Sculpt();
            exp360_scene1.add(story1Holder);
            story1Holder.add(story1);
            story1Holder.rotation.y = Math.PI / 2.3;
            story1.position.set(0, 4, -30);

            let oldViewAnimation = new RODIN.AnimationClip("oldViewAnimation", {
                _threeObject: {
                    material: {
                        opacity: { from: 0, to: 1.0 }
                    }
                }
            });
            oldViewAnimation.duration(1000);
            oldStreetView.animation.add(oldViewAnimation);

            let story1_1Animation = new RODIN.AnimationClip("story1_1Animation", {
                scale: {
                    x: { from: 0.001, to: 1.0 },
                    y: { from: 0.001, to: 1.0 },
                    z: { from: 0.001, to: 1.0 }
                }
            });
            story1_1Animation.duration(1000);

            let story1_1Animation_zout = new RODIN.AnimationClip("story1_1Animation_zout", {
                scale: {
                    x: { from: 1, to: 0.4 },
                    y: { from: 1, to: 0.4 },
                    z: { from: 1, to: 0.4 }
                },
                position: {
                    y: { from: 3.8, to: 10 },
                    x: { from: 0, to: 12 }
                }
            });
            story1_1Animation_zout.duration(1000);

            let story1_1Animation_zin = new RODIN.AnimationClip("story1_1Animation_zin", {
                scale: {
                    x: { from: 0.4, to: 1 },
                    y: { from: 0.4, to: 1 },
                    z: { from: 0.4, to: 1 }
                },
                position: {
                    y: { from: 10, to: 3.8 },
                    x: { from: 12, to: 0 }
                }
            });
            story1_1Animation_zin.duration(1000);
            story1_1.animation.add(story1_1Animation, story1_1Animation_zout, story1_1Animation_zin);

            let story1_2Animation = new RODIN.AnimationClip("story1_2Animation", {
                scale: {
                    x: { from: 0.001, to: 1.0 },
                    y: { from: 0.001, to: 1.0 },
                    z: { from: 0.001, to: 1.0 }
                }
            });
            story1_2Animation.duration(1000);

            let story1_2Animation_zout = new RODIN.AnimationClip("story1_2Animation_zout", {
                scale: {
                    x: { from: 1, to: 0.4 },
                    y: { from: 1, to: 0.4 },
                    z: { from: 1, to: 0.4 }
                },
                position: {
                    y: { from: 3.8, to: 6 },
                    x: { from: 0, to: 12 }
                }
            });
            story1_2Animation_zout.duration(1000);

            let story1_2Animation_zin = new RODIN.AnimationClip("story1_2Animation_zin", {
                scale: {
                    x: { from: 0.4, to: 1 },
                    y: { from: 0.4, to: 1 },
                    z: { from: 0.4, to: 1 }
                },
                position: {
                    y: { from: 6, to: 3.8 },
                    x: { from: 12, to: 0 }
                }
            });
            story1_2Animation_zin.duration(1000);
            story1_2.animation.add(story1_2Animation, story1_2Animation_zout, story1_2Animation_zin);

            let story1_3Animation = new RODIN.AnimationClip("story1_3Animation", {
                scale: {
                    x: { from: 0.001, to: 1.0 },
                    y: { from: 0.001, to: 1.0 },
                    z: { from: 0.001, to: 1.0 }
                }
            });
            story1_3Animation.duration(1000);

            let story1_3Animation_zout = new RODIN.AnimationClip("story1_3Animation_zout", {
                scale: {
                    x: { from: 1, to: 0.4 },
                    y: { from: 1, to: 0.4 },
                    z: { from: 1, to: 0.4 }
                },
                position: {
                    y: { from: 3.8, to: 2 },
                    x: { from: 0, to: 12 }
                }
            });
            story1_3Animation_zout.duration(1000);

            let story1_3Animation_zin = new RODIN.AnimationClip("story1_3Animation_zin", {
                scale: {
                    x: { from: 0.4, to: 1 },
                    y: { from: 0.4, to: 1 },
                    z: { from: 0.4, to: 1 }
                },
                position: {
                    y: { from: 2, to: 3.8 },
                    x: { from: 12, to: 0 }
                }
            });
            story1_3Animation_zin.duration(1000);
            story1_3.animation.add(story1_3Animation, story1_3Animation_zout, story1_3Animation_zin);

            let story1_4Animation = new RODIN.AnimationClip("story1_4Animation", {
                scale: {
                    x: { from: 0.001, to: 1.0 },
                    y: { from: 0.001, to: 1.0 },
                    z: { from: 0.001, to: 1.0 }
                }
            });
            story1_4Animation.duration(1000);

            let story1_4Animation_zout = new RODIN.AnimationClip("story1_4Animation_zout", {
                scale: {
                    x: { from: 1, to: 0.4 },
                    y: { from: 1, to: 0.4 },
                    z: { from: 1, to: 0.4 }
                },
                position: {
                    y: { from: 3.8, to: -2 },
                    x: { from: 0, to: 12 }
                }
            });
            story1_4Animation_zout.duration(1000);

            let story1_4Animation_zin = new RODIN.AnimationClip("story1_4Animation_zin", {
                scale: {
                    x: { from: 0.4, to: 1 },
                    y: { from: 0.4, to: 1 },
                    z: { from: 0.4, to: 1 }
                },
                position: {
                    y: { from: -2, to: 3.8 },
                    x: { from: 12, to: 0 }
                }
            });
            story1_4Animation_zin.duration(1000);
            story1_4.animation.add(story1_4Animation, story1_4Animation_zout, story1_4Animation_zin);

            let videoAnimation = new RODIN.AnimationClip("videoAnimation", {
                scale: {
                    x: { from: 0.001, to: 1.0 },
                    y: { from: 0.001, to: 1.0 },
                    z: { from: 0.001, to: 1.0 }
                }
            });
            videoAnimation.duration(1000);

            let videoAnimation_zout = new RODIN.AnimationClip("videoAnimation_zout", {
                scale: {
                    x: { from: 1, to: 0.32 },
                    y: { from: 1, to: 0.32 },
                    z: { from: 1, to: 0.32 }
                },
                position: {
                    y: { from: 3.8, to: 8.5 },
                    x: { from: 0, to: -12 }
                }
            });
            videoAnimation_zout.duration(1000);

            let videoAnimation_zin = new RODIN.AnimationClip("videoAnimation_zin", {
                scale: {
                    x: { from: 0.32, to: 1 },
                    y: { from: 0.32, to: 1 },
                    z: { from: 0.32, to: 1 }
                },
                position: {
                    y: { from: 8.5, to: 3.8 },
                    x: { from: -12, to: 0 }
                }
            });
            videoAnimation_zin.duration(1000);
            videoframe.animation.add(videoAnimation, videoAnimation_zout, videoAnimation_zin);

            let story1Animation = new RODIN.AnimationClip("story1Animation", {
                _threeObject: {
                    material: {
                        opacity: { from: 1.0, to: 0 }
                    }
                }
            });
            story1Animation.duration(500);
            story1.animation.add(story1Animation);

            story1.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, function () {
                story1.animation.start('story1Animation');
                changeEnv(3);
            });

            story1.on(RODIN.CONST.ANIMATION_COMPLETE, evt => {
                if (evt.animation == "story1Animation") {
                    if (startAnim != null) {
                        setTimeout(function () {
                            story1_1.animation.start('story1_1Animation');
                            responsiveVoice.speak('This is the crossroad of Tumanyan and Amiryan streets. During the years, this crossroad maintained its importance as it was situated right in the heart of the city. The Astafyan Street (now called Abovyan) was positioned as the city center, where the tramway was constructed in 1928. At the corner of the crossroad, in the place of Moskow cinema, there was St. Peter and Paul Church built during the 5th-6th centuries. Unfortunately it was demolished in 1930 to make place for the Moscow Cinema.', "US English Male", { rate: 1 });
                        }, 300);
                    }
                }
            });

            story1_1.on(RODIN.CONST.ANIMATION_COMPLETE, evt => {
                if (startAnim != null) {
                    if (evt.animation == "story1_1Animation") {
                        setTimeout(function () {
                            story1_1.animation.start('story1_1Animation_zout');
                        }, 5000);
                    } else if (evt.animation == "story1_1Animation_zout") {
                        story1_2.animation.start('story1_2Animation');
                    }
                }
            });

            story1_2.on(RODIN.CONST.ANIMATION_COMPLETE, evt => {
                if (startAnim != null) {
                    if (evt.animation == "story1_2Animation") {
                        setTimeout(function () {
                            story1_2.animation.start('story1_2Animation_zout');
                        }, 5000);
                    } else if (evt.animation == "story1_2Animation_zout") {
                        story1_3.animation.start('story1_3Animation');
                    }
                }
            });

            story1_3.on(RODIN.CONST.ANIMATION_COMPLETE, evt => {
                if (startAnim != null) {
                    if (evt.animation == "story1_3Animation") {
                        setTimeout(function () {
                            story1_3.animation.start('story1_3Animation_zout');
                        }, 5000);
                    } else if (evt.animation == "story1_3Animation_zout") {
                        story1_4.animation.start('story1_4Animation');
                    }
                }
            });

            story1_4.on(RODIN.CONST.ANIMATION_COMPLETE, evt => {
                if (startAnim != null) {
                    if (evt.animation == "story1_4Animation") {
                        setTimeout(function () {
                            story1_4.animation.start('story1_4Animation_zout');
                        }, 5000);
                    } else if (evt.animation == "story1_4Animation_zout") {
                        videoframe.animation.start('videoAnimation');
                    }
                }
            });

            videoframe.on(RODIN.CONST.ANIMATION_COMPLETE, evt => {
                if (startAnim != null) {
                    if (evt.animation == "videoAnimation") {
                        setTimeout(function () {
                            videoframe.animation.start('videoAnimation_zout');
                        }, 1000);
                    } else if (evt.animation == "videoAnimation_zout") {
                        oldStreetView.animation.start('oldViewAnimation');
                        startAnim = null;
                    }
                }
            });

            function changeThumbs(existing_thumb, new_thumb, story_new, story_existing) {
                if (existingStory == null) {
                    existingStory = story_new;
                    existingAnim = new_thumb;
                    story_new.animation.start(new_thumb + 'Animation_zin');
                } else {
                    existingStory.animation.start(existingAnim + 'Animation_zout');
                    story_new.animation.start(new_thumb + 'Animation_zin');
                    existingStory = story_new;
                    existingAnim = new_thumb;
                }
            }

            function changeEnvPublic(num) {
                if (num == 1) {
                    RODIN.Scene.remove(exp360_scene1);
                    RODIN.Scene.add(exp360_scene2);
                } else if (num == 2) {
                    RODIN.Scene.remove(exp360_scene2);
                    RODIN.Scene.add(exp360_scene1);
                } else if (num == 3) {
                    story1.animation.start('story1Animation');
                }
            }

            _export('default', changeEnvPublic);

            function changeEnv(num) {

                changeEnvSocket(num);
            }

            scene1.scale.set(-1, 1, 1);
            scene2.scale.set(-1, 1, 1);

            hotspot1.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, function (evt) {
                RODIN.Scene.remove(exp360_scene1);
                RODIN.Scene.add(exp360_scene2);
                changeEnv(1);
            });

            hotspot2.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, function (evt) {
                RODIN.Scene.remove(exp360_scene2);
                RODIN.Scene.add(exp360_scene1);
                changeEnv(2);
            });

            story1_1.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, function (evt) {
                if (player.hasStarted && existingAnim == 'video') {
                    player.playPause();
                }
                if (existingAnim == 'story1_1') {
                    existingAnim = null;
                    existingStory = null;
                    story1_1.animation.start('story1_1Animation_zout');
                } else changeThumbs(null, 'story1_1', story1_1, null);
            });

            story1_2.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, function (evt) {
                if (player.hasStarted && existingAnim == 'video') {
                    player.playPause();
                }
                if (existingAnim == 'story1_2') {
                    existingAnim = null;
                    existingStory = null;
                    story1_2.animation.start('story1_2Animation_zout');
                } else changeThumbs(null, 'story1_2', story1_2, null);
            });

            story1_3.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, function (evt) {
                if (player.hasStarted && existingAnim == 'video') {
                    player.playPause();
                }
                if (existingAnim == 'story1_3') {
                    existingAnim = null;
                    existingStory = null;
                    story1_3.animation.start('story1_3Animation_zout');
                } else changeThumbs(null, 'story1_3', story1_3, null);
            });

            story1_4.on(RODIN.CONST.GAMEPAD_BUTTON_DOWN, function (evt) {
                if (player.hasStarted && existingAnim == 'video') {
                    player.playPause();
                }
                if (existingAnim == 'story1_4') {
                    existingAnim = null;
                    existingStory = null;
                    story1_4.animation.start('story1_4Animation_zout');
                } else changeThumbs(null, 'story1_4', story1_4, null);
            });

            RODIN.Scene.add(exp360_scene1);
        }
    };
});