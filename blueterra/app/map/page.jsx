export default function Map() {

    return (
        <div className=" w-full h-full flex-center">
            <div className="w-11/12 h-screen flex  justify-between items-center  ">
                <iframe src="https://www.travellerspoint.com/embed/map.cfm/#/embed/1201064/1558730/" width="1000" height="600" style={{ marginBottom: '10px', border: 0 }}></iframe>
                <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1s2Cp_-U5hA0UE60a61oNStfqGTb9IYU&ehbc=2E312F&noprof=1" width="640" height="480"></iframe>
            </div>
        </div>
    );
}