import React from "react";
import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from "@/components/ui/TotalBalanceBox";


const Home = () =>{
    const LoggedIn = {firstname: "Sanchit"}
    return(
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type = "greeting"
                        title = "Welcome"
                        user={LoggedIn?.firstname || "Guest"}
                        subtext="Acess granted"
                    />

                    <TotalBalanceBox
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1789.75}
                    />
                </header>
            </div>
        </section>
    )
}

export default Home 