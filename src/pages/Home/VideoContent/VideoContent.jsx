import vdo1 from '../../../assets/sea.mp4';
import vdo2 from '../../../assets/man.mp4';
import vdo3 from '../../../assets/forest.mp4';
import vdo4 from '../../../assets/team.mp4';



const VideoContent = () => {


    return (
        <div className=' grid grid-cols-2 gap-4'>
            <div className=''>
                <video  style={{ outline: 'none', border: 'none' }} autoPlay={true} muted loop controls={false}>
                    <source src={vdo1} type="video/mp4" />
                </video>
            </div>
            <div className=' '>
                <video  style={{ outline: 'none', border: 'none' }} autoPlay={true} muted loop controls={false}>
                    <source src={vdo2} type="video/mp4" />
                </video>
            </div>
            <div className=''>
                <video  style={{ outline: 'none', border: 'none' }} autoPlay={true} muted loop controls={false}>
                    <source src={vdo3} type="video/mp4" />
                </video>
            </div>
            <div className=''>
                <video  style={{ outline: 'none', border: 'none' }} autoPlay={true} muted loop controls={false}>
                    <source src={vdo4} type="video/mp4" />
                </video>
            </div>

        </div>

    );
};

export default VideoContent;