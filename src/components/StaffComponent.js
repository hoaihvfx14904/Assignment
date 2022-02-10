import React from 'react';
import { Card, CardImg, CardTitle,} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderStaffItem ({staff}) {
    return (
        <Card>
            <Link to={`/Staff/${staff.id}`} className='non-decoration' >
                <CardImg width="100%" src={staff.image} alt={staff.name} />
                <CardTitle className='css-name-staff'>{staff.name}</CardTitle>
            </Link>
        </Card>
    );
}
    const Staff = (props) => {
        const menu = props.staffs.map((staff) =>{
            return (
                <div key={staff.id} className='col-6 col-md-4 col-lg-2 mb-3'>
                    <RenderStaffItem staff={staff}  />
                </div>
            )
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3>Nhân viên</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
}
export default Staff;