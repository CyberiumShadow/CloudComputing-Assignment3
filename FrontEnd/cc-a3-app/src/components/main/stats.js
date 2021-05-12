import NavBar from 'components/utils/navBar';
import './main.css';

function Stats() {
  return (
    <div>
      <NavBar currentPage={'Stats'} />
      <div className="content-wrapper">
        <h3 className="page-title">Stats</h3>
        <hr />
        This page shows user's past car hire records and stats
      </div>
    </div>
  );
}

export default Stats;