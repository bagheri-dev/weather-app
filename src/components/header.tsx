import React from "react";

const Header: React.FC = () => {
    return ( 
        <>
        <header>
            <div className="flex items-center justify-between py-3">
                <div className="flex items-center gap-x-3">
                    <img className="size-20" src="/public/images/weather-app.png" alt="" />
                    <p className="text-7xl text-white">WeatherMe</p>
                </div>
                <div>
                    <nav>
                        <ul className="flex gap-x-5 text-3xl text-white">
                            <li className="border-b-2 border-b-[#695D5D] font-bold">Today</li>
                            <li>Tommorow</li>
                            <li>Monthly Forecast</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        </>
     );
}
 
export default Header;