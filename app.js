"use strict";

(function(parser, animator){
	var steps;
	var btnStart = document.getElementById("start");
	var btnStop = document.getElementById("stop");
	var btnReset = document.getElementById("reset");

    function updateUI() {
        btnStart.disabled = animator.isRunning();
        btnStop.disabled = !animator.isRunning();
    }

    function hookEventHandler() {
        btnStart.addEventListener("click", function() {
            var code = document.getElementById("code").value;
            try {
                steps = parser.parse(code);
            }
            catch (xcp) {
                alert(xcp);
            }
			
            if (steps.length === 0) {
                alert("Schreib der Maus was sie tun soll.");
            }
            else {
                animator.run(steps, 
                    function() {
                        updateUI();
                    },
                    function() {
                        updateUI();
                    });
            }			
        });
		
        btnStop.addEventListener("click", function() {
            animator.stop();
        });
		
        btnReset.addEventListener("click", function() {
            animator.reset();
            updateUI();
        });
    }

    hookEventHandler();
	updateUI();
})(parser, animator);
