function riemann(f, range, steps) {
    const dx = (range.max - range.min) / steps;
    
    let sum = f(range.min) + f(range.max);
    let x = range.min;
    for (let i = 1; i < steps; i++) {
        x += dx;
        sum += 2 * f(x);
    }

    return 1 / 2 * dx * sum;
}


window.onload = (event) => {
    const formulaInput = document.getElementById("formula");
    const rangeLInput = document.getElementById("rangemin");
    const rangeRInput = document.getElementById("rangemax");
    const resultOutput = document.getElementById("result");
    const resultTitle = document.getElementById("result-title");

    function output(value) {
        formulaInput.style.backgroundColor = isNaN(value) ? "red" : null;
        resultOutput.style.backgroundColor = isNaN(value) ? "red" : "green";
        
        resultOutput.innerHTML = value.toFixed(9);
        return value;
    }

    let intervalHandle;
    function update() {
        const range = {"min": parseFloat(rangeLInput.value), "max": parseFloat(rangeRInput.value)};

        rangeLInput.style.backgroundColor = null;
        rangeRInput.style.backgroundColor = null;
        if (       isNaN(range.min)
                || isNaN(range.max)
                || !isFinite(range.min)
                || !isFinite(range.max)
                || range.max <= range.min) {
            rangeLInput.style.backgroundColor = "red";
            rangeRInput.style.backgroundColor = "red";
            return;
        }

        function f(x) {
            try {
                return eval(formulaInput.value);
            } catch {
                return NaN;
            }
        }

        if (intervalHandle) {
            clearInterval(intervalHandle);
        }
        
        let steps = 0;
        intervalHandle = setInterval(() => {
            steps += 10;
            let result = output(riemann(f, range, steps));
            if (!isNaN(result)) {
                resultTitle.innerHTML = `Result (steps: ${steps})`;
            }

            if (steps >= 1000) {
                clearInterval(intervalHandle);
            }
        }, 20);
    }

    formulaInput.addEventListener("input", update);
    rangeLInput.addEventListener("input", update);
    rangeRInput.addEventListener("input", update);

    update();
};
