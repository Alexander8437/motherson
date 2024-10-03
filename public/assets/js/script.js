

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let selectedOptions = [];
    const checkboxes = document.querySelectorAll('input[name="option"]:checked');

    checkboxes.forEach((checkbox) => {
        selectedOptions.push(checkbox.value);
    });

    if (selectedOptions.length > 0) {
        doc.text("Selected Options:", 10, 10);
        selectedOptions.forEach((option, index) => {
            doc.text(`${index + 1}. ${option}`, 10, 20 + (10 * index));
        });
    } else {
        doc.text("No options selected.", 10, 10);
    }

    doc.save("selected-options.pdf");
}


function toggleDropdown() {
    var dropdownContent = document.getElementById("dropdown-content");
    dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
}

function handleSubmit() {
    document.getElementById('optionsForm').submit();
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === "block") {
                openDropdown.style.display = "none";
            }
        }
    }
}





document.addEventListener('DOMContentLoaded', function () {
    const threeDots = document.getElementById('threeDots');
    const dropdownMenu = document.getElementById('dropdownMenu00');

    threeDots.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!threeDots.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const profileBox = document.getElementById('profileBox');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // Example email for demonstration
    const email = "example@example.com";
    const firstLetter = email.charAt(0).toUpperCase();
    profileBox.textContent = firstLetter;

    profileBox.addEventListener('click', function () {
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function (event) {
        if (!profileBox.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
});


// search box script code start
document.addEventListener('DOMContentLoaded', function () {
    const searchIcon = document.getElementById('searchIcon');
    const searchBox = document.getElementById('searchBox');
    const searchContainer = document.querySelector('.search-container');

    searchIcon.addEventListener('click', function () {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchBox.focus();
        }
    });

    document.addEventListener('click', function (event) {
        if (!searchContainer.contains(event.target)) {
            searchContainer.classList.remove('active');
        }
    });
});
// search box script code end



// automatically date and day change code start
document.addEventListener('DOMContentLoaded', function () {
    const currentDateElement = document.getElementById('currentDate');
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function updateCurrentDate() {
        const today = new Date();
        const dayName = daysOfWeek[today.getDay()];
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        currentDateElement.textContent = `${dayName}, ${formattedDate}`;
    }

    updateCurrentDate();
});
// automatically date and day change code end



function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with className="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with className="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it to open the default tab
document.getElementById("defaultOpen").click();


// popup notification code start
// function showNotification() {
//     var notification = document.getElementById("notification");
//     notification.classList.add("show");

//     setTimeout(function () {
//         closeNotification();
//     }, 3000);
// }

// function closeNotification() {
//     var notification = document.getElementById("notification");
//     notification.classList.remove("show");
// }




function showNotification(notificationId) {
    var notifications = document.getElementsByClassName("notification");
    for (var i = 0; i < notifications.length; i++) {
        notifications[i].style.display = "none";
    }
    var notification = document.getElementById(notificationId);
    notification.style.display = notification.style.display === "block" ? "none" : "block";
}

function closeNotification(notificationId) {
    var notification = document.getElementById(notificationId);
    notification.style.display = "none";
}

window.onclick = function (event) {
    if (!event.target.closest('.sidenav button')) {
        var notifications = document.getElementsByClassName("notification");
        for (var i = 0; i < notifications.length; i++) {
            notifications[i].style.display = "none";
        }
    }
}

window.onload = function () {
    var notifications = document.getElementsByClassName("notification");
    for (var i = 0; i < notifications.length; i++) {
        notifications[i].style.display = "none";
    }
}
// popup notification code end




document.addEventListener("DOMContentLoaded", function () {
    var dropdownBtn = document.querySelector(".dropdown-btn");
    var dropdownContent = document.querySelector(".dropdown-content");

    dropdownBtn.addEventListener("click", function () {
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
});





function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with className="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with className="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace("active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += "active";

}




let valueDisplays = document.querySelectorAll(".num");
let interval = 7000;
valueDisplays.forEach((valueDisplay) => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval / endValue);
    let counter = setInterval(function () {
        startValue += 1;
        valueDisplay.textContent = startValue;
        if (startValue == endValue) {
            clearInterval(counter);
        }
    }, duration);
});




const navEl = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY >= 56) {
        navEl.classList.add('navbar-scrolled');
    } else if (window.scrollY < 56) {
        navEl.classList.remove('navbar-scrolled');
    }
});


