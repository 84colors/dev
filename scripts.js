gsap.registerPlugin(ScrollTrigger);

//Get model-viewer with ID of model
const mv = document.querySelector("#model");

//Set initial camera view
const camTargetInit =
    "0.10275006294250488m -0.01528758555650711m 0.000018998980522155762m";
const camOrbitInit =
    "0.5235987755982988rad 0.9599310885968813rad 8.854758152403196m";

let resetCam = true;
$(".Hotspot").hide();

// --------------------
// Change camera target on click
// --------------------
$(".Hotspot").on("click", function () {
    let camOrbit = this.dataset.orbit;
    let camTarget = this.dataset.target;
    //If camera is reset, then update it with hotspot info
    if (resetCam == true) {
        mv.cameraTarget = camTarget;
        mv.cameraOrbit = camOrbit;
        resetCam = false;

        //Hide hotspots except active
        $(".Hotspot").hide();
        $(this).show();
    } else {
        mv.cameraTarget = camTargetInit;
        mv.cameraOrbit = camOrbitInit;
        resetCam = true;

        //Show hotspots
        $(".Hotspot").show();
    }
    //Toggle class of dot
    $(this).toggleClass("is-active");
});

// --------------------
// Hide dome on click
// --------------------
mv.addEventListener("load", (e) => {
    let isOpaque = true;
    // console.log(mv.model);
    const ball = mv.model.getMaterialByName("Dome");

    $('.Hotspot[slot="hotspot-1"]').on("click", function () {
        if (isOpaque) {
            console.log("first");
            ball.setAlphaMode("BLEND");
            ball.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0.01]);
            isOpaque = false;
        } else {
            console.log("second");
            ball.setAlphaMode("OPAQUE");
            ball.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 1]);
            isOpaque = true;
        }
        console.log("yep");
    });
});

// --------------------
// Spin on load then play animation
// --------------------
mv.addEventListener("load", (e) => {
    //Fade material
    const domeMat = mv.model.getMaterialByName("Case");

    //Animation
    const playAnim = () => {
        if (mv.paused) {
            // mv.play({ animationName: "Animation", repetitions: 1 });
            // domeMat.setAlphaMode("BLEND");
        } else {
            mv.pause();
        }
    };
    const tlSpin = gsap.timeline();

    tlSpin.to(mv, {
        duration: 4,
        ease: Power3.easeIn,
        attr: {
            ["camera-orbit"]: "30deg 55deg 130%",
        },
        onStart: function () {
            console.log("play");
        },
        onComplete: function () {
            console.log("finish");
            $(".Hotspot").show();
        },
    });

    // console.log(setAlpha.value);
});

// --------------------
// Play GLTF animation. note: bug with repetion when using name
// --------------------

mv.addEventListener("camera-change", (e) => {
    let cameraTargetNew = mv.getCameraTarget();
    let cameraOrbitNew = mv.getCameraOrbit();
    // console.log(`Target: ${cameraTargetNew};`, `Orbit: ${cameraOrbitNew}`);
});
