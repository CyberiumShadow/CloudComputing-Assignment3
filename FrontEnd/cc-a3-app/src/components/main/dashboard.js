import NavBar from 'components/utils/navBar';
import './main.css';

function Dashboard() {
  return (
    <div>
      <NavBar currentPage={'Dashboard'} />
      <div className="content-wrapper">
        <h3 className="page-title">Dashboard</h3>
        <hr />
        This page shows upcoming car rental and current car hire listing
      </div>
    </div>
  );
}

export default Dashboard;