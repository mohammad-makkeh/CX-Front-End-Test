import './Dashboard.css'
import D3Chart from '../D3Chart/D3Chart.jsx'
import HighChart from '../HighChart/HighChart.jsx'



const Dashboard = () => {

    return (
        <>
        <div className="dashboard">
            <h1 className='dash-title'>Dashboard</h1>
            <p>The exam was done using two libraries, Highcharts and D3. Each with their own configurations, and own data source...</p>
            <div className='charts-container'>
                <HighChart /> 
                <D3Chart />
            </div>
        </div>
        </>


    )
}


export default Dashboard