<script>
    import "../app.css";
</script>

<div class="flex flex-col min-h-screen">
    <div class="navbar bg-base-300">
        <div class="flex-1">
            <a href="/" class="btn btn-ghost normal-case text-xl"
                >Travel Booking System</a
            >
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1">
                <li><a href="/travelers">Travelers</a></li>
                <li><a href="/accommodations">Accommodations</a></li>
                <li><a href="/flights">Flights</a></li>
                <li><a href="/car_rentals">Car Rentals</a></li>
                <li><a href="/bookings">Bookings</a></li>
                <li><a href="/notifications">Notifications</a></li>
            </ul>
        </div>
    </div>
    <div class="flex-grow">
        <slot />
    </div>
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
        <aside>
            <p>
                Copyright © 2023 - All right reserved by <a
                    href="https://facebook.com/itsmenewbie03">itsmenewbie03</a
                >
            </p>
        </aside>
    </footer>
</div>
