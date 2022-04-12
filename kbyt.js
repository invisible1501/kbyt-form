import React from "react";
import { Formik, useFormik } from "formik";
import * as Yup from 'yup'
import axios from 'axios';
import { useState } from "react";
import { URL } from "./api";
import { useEffect } from "react";
import "./kbyt.css";

function HealthDeclare(props) {
    const [signal, setSignal] = useState([
        {id: 1, label: 'fever', choose: false},
        {id: 2, label: 'cough', choose: false},
        {id: 3, label: 'shortBreath', choose: false},
        {id: 4, label: 'none', choose: false}
    ]);

    const [gender, setGender] = useState([
        {id: 1, label: 'male', choose: false},
        {id: 2, label: 'female', choose: false},
        {id: 3, label: 'other', choose: false}
    ]);

    const formik = useFormik({
        initialValues: {
            name: "",
            cmnd: "",
            dateOfBirth: "",
            nationality: "Việt Nam",
            company: "",
            department: "",
            isHealthInsurance: false,
            city: "",
            district: "",
            ward: "",
            address: "",
            phone: "",
            email: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Không được để trống"),
            cmnd: Yup.string()
                .required("Không được để trống")
                .min(9, "CMND dài từ 9 đến 12 kí tự!")
                .max(12, "CMND dài từ 9 đến 12 kí tự!"),
            dateOfBirth: Yup.string().required("Không được để trống"),
            nationality: Yup.string().required("Không được để trống"),
            company: Yup.string().required("Không được để trống"),
            department: Yup.string().required("Không được để trống"),
            city: Yup.string().required("Không được để trống"),
            district: Yup.string().required("Không được để trống"),
            ward: Yup.string().required("Không được để trống"),
            address: Yup.string().required("Không được để trống"),
            phone: Yup.string()
                .required("Không được để trống")
                .min(9, "SĐT phải từ 9 đến 12 số")
                .max(11, "SĐT phải từ 9 đến 12 số"),
            email: Yup.string()
                .required("Không được để trống")
                .email("Email phải có dạng: abc123@gmail.com"),
        }),
        onSubmit: (values) => {
            console.log({ ...values, gender: gender, signal: signal });
        }
    });

    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);

    const getCity = async () => {
        try {  
            let res = await axios.get(`${URL.baseURL}/p?depth=1`);
            setCity(res.data);
        } catch(error) {
            console.log(error)
        }
    };

    const getDistrict = async () => {
        try {  
            let res = await axios.get(`${URL.baseURL}/p/${formik.values.city}?depth=2`);
            setDistrict(res.data.districts ? res.data.districts : [] );
        } catch(error) {
            console.log(error)
        }
    };

    const getWard = async () => {
        try {
            let res = await axios.get(`${URL.baseURL}/d/${formik.values.district}?depth=2`);
            setWard(res.data.wards ? res.data.wards : []);
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getCity();
    }, []);

    useEffect(() => {
        getDistrict();
    }, [formik.values.city]);

    useEffect(() => {
        getWard();
    }, [formik.values.district]);

    return (
        <div id="wrapper">
            <form onSubmit={formik.handleSubmit}>
                <h1>Biểu mẫu khai báo y tế</h1>
                <div>
                    <label>Họ tên: </label><br />
                    <input 
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {(formik.errors.name && formik.touched.name && formik.errors.name) && (
                        <p>{formik.errors.name}</p>
                    )}
                </div>
                <div>
                    <label>CMND / CCCD: </label><br />
                    <input 
                        name="cmnd"
                        value={formik.values.cmnd}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.cmnd && formik.touched.cmnd ? (
                        <p>{formik.errors.cmnd}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Ngày tháng năm sinh: </label><br />
                    <input 
                        name="dateOfBirth"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                        <p>{formik.errors.dateOfBirth}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Giới tính: </label><br />
                    {gender.map(genderItem => {
                        return (
                            <React.Fragment key={genderItem.id}>
                                <input 
                                    name="gender"
                                    checked={genderItem.choose}
                                    onChange={() => {
                                        let _gender = [...gender];
                                        _gender.map(item => {
                                            if(item.id === genderItem.id) {
                                                item.choose = true;
                                            } else item.choose = false;
                                        })
                                        setGender(_gender);
                                    }}
                                    onBlur={formik.handleBlur}
                                    type="radio"    
                                />
                                <label className="gender">{genderItem.label}</label>
                            </React.Fragment>
                        )
                    })}
                </div>
                <div>
                    <label>Quốc tịch: </label><br />
                    <input 
                        name="nationality"
                        value={formik.values.nationality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.nationality && formik.touched.nationality ? (
                        <p>{formik.errors.nationality}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Công ty làm việc: </label><br />
                    <input 
                        name="company"
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.company && formik.touched.company ? (
                        <p>{formik.errors.company}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Vị trí trong công ty: </label><br />
                    <input 
                        name="department"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.department && formik.touched.department ? (
                        <p>{formik.errors.department}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Thành phố: </label><br />
                    <select
                        name="city"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.city}
                    >
                        <option>Chọn thành phố</option>
                        {city.map(cityItem => {
                            return (
                                <option key={cityItem.code} value={cityItem.code}>{cityItem.name}</option>
                            )
                        })}
                    </select>
                    {formik.errors.city && formik.touched.city ? (
                        <p>{formik.errors.city}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Quận: </label><br />
                    <select
                        name="district"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.district}
                        disabled={!formik.values.city}
                    >
                        <option>Chọn quận</option>
                        {district.map(districtItem => {
                            return (
                                <option key={districtItem.code} value={districtItem.code}>{districtItem.name}</option>
                            )
                        })}
                    </select>
                    {formik.errors.district && formik.touched.district ? (
                        <p>{formik.errors.district}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Phường: </label><br />
                    <select
                        value={formik.values.ward}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        disabled={!formik.values.district}
                        name="ward"
                    >
                        <option>Chọn phường / xã</option>
                        {ward.map(wardItem => {
                            return (
                                <option key={wardItem.code}>{wardItem.name}</option>    
                            )
                        })}
                    </select>
                    {formik.errors.ward && formik.touched.ward ? (
                        <p>{formik.errors.ward}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Số nhà, đường: </label><br />
                    <input 
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.address && formik.touched.address ? (
                        <p>{formik.errors.address}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Số điện thoại: </label><br />
                    <input 
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.phone && formik.touched.phone ? (
                        <p>{formik.errors.phone}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Email: </label><br />
                    <input 
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        type="text"    
                    />
                    {formik.errors.email && formik.touched.email ? (
                        <p>{formik.errors.email}</p>
                    ) : (
                        null
                    )}
                </div>
                <div>
                    <label>Bạn có dấu hiệu gì ở dưới đây: </label><br />
                    {signal.map(signalItem => {
                        return (
                            <div className="signal" key={signalItem.id}>
                                <input 
                                    name="signal"
                                    checked={signalItem.choose}
                                    onChange={() => {
                                        let _signal = [...signal];
                                        _signal.map(item => {
                                            if(item.id === signalItem.id) {
                                                item.choose = !item.choose;
                                                setSignal(_signal);
                                            }
                                        })
                                    }}
                                    onBlur={formik.handleBlur}
                                    type="checkbox"    
                                />
                                <label>{signalItem.label}</label>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <input type='submit'></input>
                </div>
            </form>
        </div>
    )
}

export default HealthDeclare;