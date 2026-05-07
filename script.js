const form = document.getElementById("donationForm");

const progress = document.getElementById("fundraising");

const progressText =
document.getElementById("progressText");

const supportBtn =
document.getElementById("supportBtn");

const popup =
document.getElementById("popup");

const popupMessage =
document.getElementById("popupMessage");

const closePopup =
document.getElementById("closePopup");

const continueBtn =
document.getElementById("continueBtn");

let totalDonation = 32500;

const goal = 50000;

/* Progress Update */

function updateProgress(){

    let percent =
    (totalDonation / goal) * 100;

    progress.value = totalDonation;

    progressText.textContent =
    Math.round(percent) +
    "% of the goal completed";
}

updateProgress();

/* Support Button */

supportBtn.addEventListener(
    "click",

    function(){

        alert(
            "Thank you for supporting our campaign!"
        );
    }
);

/* Form Submit */

form.addEventListener(
    "submit",

    function(e){

        e.preventDefault();

        const name =
        document.getElementById("name")
        .value.trim();

        const email =
        document.getElementById("email")
        .value.trim();

        const selectedAmount =
        document.querySelector(
            'input[name="amount"]:checked'
        );

        const customAmount =
        document.getElementById("customAmount")
        .value.trim();

        const card =
        document.getElementById("card")
        .value.trim();

        const expiry =
        document.getElementById("expiry")
        .value.trim();

        const cvv =
        document.getElementById("cvv")
        .value.trim();

        /* Validation */

        if(name === ""){

            alert("Please enter your name.");

            return;
        }

        if(email === ""){

            alert("Please enter your email.");

            return;
        }

        if(!selectedAmount){

            alert(
                "Please select a donation amount."
            );

            return;
        }

        let finalAmount =
        selectedAmount.value;

        if(selectedAmount.value === "custom"){

            if(
                customAmount === "" ||
                isNaN(customAmount) ||
                Number(customAmount) <= 0
            ){

                alert(
                    "Please enter valid custom amount."
                );

                return;
            }

            finalAmount = customAmount;
        }

        if(card !== "" && card.length < 12){

            alert(
                "Please enter valid card number."
            );

            return;
        }

        if(expiry !== "" && expiry.length < 4){

            alert(
                "Please enter expiry in MM/YY."
            );

            return;
        }

        if(cvv !== "" && cvv.length < 3){

            alert(
                "Please enter valid CVV."
            );

            return;
        }

        /* Donation Update */

        totalDonation += Number(finalAmount);

        if(totalDonation > goal){

            totalDonation = goal;
        }

        updateProgress();

        /* Popup */

        popupMessage.innerHTML =

        `Thank you <b>${name}</b>
        for donating
        <b>$${finalAmount}</b>!<br><br>

        Your support brings hope
        to people in need.`;

        popup.style.display = "flex";

        form.reset();
    }
);

/* Close Popup */

closePopup.addEventListener(

    "click",

    function(){

        popup.style.display = "none";
    }
);

continueBtn.addEventListener(

    "click",

    function(){

        popup.style.display = "none";
    }
);