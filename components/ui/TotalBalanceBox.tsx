import React from "react";
import { formatAmount } from "@/lib/utils";
import AnimateCounter from "./AnimateCounter";

const TotalBalanceBox = ({
    accounts=[], totalBanks, totalCurrentBalance
}:TotlaBalanceBoxProps) =>{
    return(
        <section className="total-balance">
            
            <div className="flex flex-col gap-5">
                <h2 className="header-2">
                    Bank Accounts: {totalBanks}
                </h2>
                <div className="flex flex-col gap-2">
                    <div className="total-balance-label">
                        Total Current Balance
                    </div>
                    <div className="total-balance-amount flex-center gap-2">
                        <AnimateCounter amount={totalCurrentBalance}/>
                    </div>

                </div>
            </div>
            
            <div className="total-balance-chart">
                
            </div>
        </section>
    )
}

export default TotalBalanceBox