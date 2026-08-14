(() => {
    const dashes = document.querySelector(".ouroboros-dashes");
    const head = document.querySelector(".ouroboros-head");
    if (!dashes || !head) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const centerX = 60;
    const centerY = 60;
    const radius = 40;
    const circumference = 2 * Math.PI * radius;

    const speed = 4; // svg units per second — slow, meditative drift
    const direction = -1; // 1 = clockwise, -1 = counterclockwise

    let distance = 0;
    let lastTime = null;

    function tick(time) {
        if (lastTime !== null) {
            const delta = (time - lastTime) / 1000;
            distance += speed * delta;

            dashes.style.strokeDashoffset = -direction * distance;

            const angle = direction * (distance / circumference) * 360;
            head.setAttribute("transform", `rotate(${angle} ${centerX} ${centerY})`);
        }
        lastTime = time;
        requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
})();
