document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const closeSidebar = document.getElementById('close-sidebar');
    const container = document.querySelector('.container');

    burger.addEventListener('click', function() {
        container.classList.add('sidebar-open');
    });

    closeSidebar.addEventListener('click', function() {
        container.classList.remove('sidebar-open');
    });
});
