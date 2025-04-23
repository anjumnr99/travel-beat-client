
import { Link } from 'react-router-dom';
import './tourType.css';

const Slide = ({ item }) => {
    const { type, video } = item || {};
    return (
        <div className=''>
            <Link to={`/packages/${type}`} className='flex flex-col'>
                <h1>{type}</h1>
                <video style={{ outline: 'none', border: 'none' }} autoPlay={true} muted loop controls={false}>
                    <source src={video} type="video/mp4" />
                </video>

            </Link>
        </div>
    );
};

export default Slide;