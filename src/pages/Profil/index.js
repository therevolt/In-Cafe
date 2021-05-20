import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
    InputNoBorder,
    BtnPen,
    TextAreaNoBorder,
    CustomButton,
} from "../../components/atoms";
import { Navbar } from "../../components/organisme";
import { Footer } from "../../components/templates";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import Modal from 'react-modal'
import style from './ModalConfig.module.css'
function Profil() {
    const [toggleModal, setToggleModal] = React.useState(false);
    const [updatedImage, setUpdateImage] = useState("https://raw.githubusercontent.com/Codelessly/FlutterLoadingGIFs/master/packages/cupertino_activity_indicator.gif")
    const [pass, setPass] = useState({
        newPassword : '',
        confirmPassword : '',
        message : {
            newPassword : '',
            confirmPassword : ''
        }
    })
    const history = useHistory();
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.user);
    const [dataUser, setDataUser] = useState({
        avatar: "",
        email: "",
        phone: "",
        address: "",
        displayName: "",
        firstName: "",
        lastName: "",
        birthday: "",
        gender: "",
    });

    const imgRef = useRef();

    useEffect(() => {
        setDataUser({
            avatar: data.avatar,
            email: data.email,
            phone: data.phone,
            address: data.address,
            displayName: data.displayName,
            firstName: data.firstName,
            lastName: data.lastName,
            birthday: data.birthday,
            gender: data.gender,
        });
        setUpdateImage(data.avatar)
    }, [data]);

    const token = localStorage.getItem("token");

    function handleLogOut() {
        localStorage.removeItem('token')
        history.push("/user/login");
    }
    function handleCancel(){
        setDataUser({
            avatar: data.avatar,
            email: data.email,
            phone: data.phone,
            address: data.address,
            displayName: data.displayName,
            firstName: data.firstName,
            lastName: data.lastName,
            birthday: data.birthday,
            gender: data.gender,
        });
    }
    function handleModal(){
        toggleModal? setToggleModal(false) : setToggleModal(true)
    }
    function handleSubmit() {
        const formData = new FormData();
        formData.append("avatar", dataUser.avatar);
        formData.append("email", dataUser.email);
        formData.append("phone", dataUser.phone);
        formData.append("address", dataUser.address);
        formData.append("displayName", dataUser.displayName);
        formData.append("firstName", dataUser.firstName);
        formData.append("lastName", dataUser.lastName);
        formData.append("birthDay", dataUser.birthDay);
        formData.append("gender", dataUser.gender);
        axios({
            method: "PUT",
            url: `${process.env.REACT_APP_SERVER}/v1/users`,
            data: formData,
            headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
            dispatch({
                type: "LOGIN_REQUEST",
                payload: response.data.data,
            });
            swal("Berhasil", response.data.message, "success").then(() => { window.location = "/user/Profil" });
        });
    }

    const handleChangeGender = (e) => {
        setDataUser({ ...dataUser, gender: e.target.value });
    };

    const clickImg = () => {
        imgRef.current.click();
    };

    function handleSubmitPass(){
        if(pass.newPassword.length == 0){
            setPass({
                ...pass,
                message : {
                    ...pass.message,
                    newPassword : 'field tidak boleh kosong'
                }
            })
        }else{
            if(pass.confirmPassword === pass.newPassword){
                axios({
                    method: "PUT",
                    url: `${process.env.REACT_APP_SERVER}/v1/users`,
                    data: {
                        password : pass.newPassword
                    },
                    headers: { Authorization: `Bearer ${token}` },
                }).then((response) => {
                    dispatch({
                        type: "LOGIN_REQUEST",
                        payload: response.data.data,
                    });
                    swal("Berhasil", response.data.message, "success");
                    setToggleModal(false)
                });
            }else{
                setPass({
                    ...pass,
                    message : {
                        ...pass.message,
                        confirmPassword : "password doesn't match"
                    }
                })
            }
        }
    }
    return (
        <div className="showInAnimation poppinsFont">
            <Navbar/>
            <div className="container-fluid bg-profil">
                <div className="container mx-auto">
                    <div className="row">
                        <div className="col-10 col-lg-4 my-2 my-lg-5 mx-auto">
                            <div className="card-profil bg-white py-4 px-4 text-center shadow">
                                <div
                                    className="mb-3 px-5 position-relative mt-4 mx-auto"
                                    onClick={clickImg}
                                >
                                    <img src={updatedImage} className="hoverThis rounded-circle w-100" />
                                </div>
                                <div className="my-2 d-none">
                                    <input
                                        type="file"
                                        className="form-control"
                                        onChange={(e) => {
                                            const reader = new FileReader()
                                            reader.addEventListener("load", () => {
                                            setUpdateImage(reader.result)
                                            })
                                            reader.readAsDataURL(e.target.files[0])
                                            setDataUser({ ...dataUser, avatar: e.target.files[0] });
                                        }}
                                        ref={imgRef}
                                    />
                                </div>
                                <div className="my-3">
                                    <h3 className="fw-600 m-0">{data.displayName}</h3>
                                    <p className="fs-12">{data.email}</p>
                                </div>
                                <div className="my-4">
                                    <p>hash been Ordered 6 Products</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-8 my-2 my-lg-5 mx-auto">
                            <div className="card-profil bg-white py-4 px-4 shadow w-100">
                                <div className="d-flex justify-content-between">
                                    <div className="align-self-center">
                                        <h4>Contacts</h4>
                                    </div>
                                    <BtnPen />
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <InputNoBorder label="Email Adress :" value={dataUser.email} />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <InputNoBorder
                                            label="Mobile number :"
                                            type="number"
                                            value={dataUser.phone}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, phone: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <TextAreaNoBorder
                                            label="Delivery adress :"
                                            row="1"
                                            value={dataUser.address}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, address: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-lg-8 my-2 my-lg-5 mx-auto">
                            <div className="card-profil bg-white py-4 px-4 shadow">
                                <div className="d-flex justify-content-between">
                                    <div className="align-self-center">
                                        <h4>Details</h4>
                                    </div>
                                    <BtnPen />
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-8">
                                        <InputNoBorder
                                            label="Display name :"
                                            value={dataUser.displayName}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, displayName: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <InputNoBorder
                                            label="DD/MM/YY"
                                            type="date"
                                            value={dataUser.birthday}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, birthday: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <InputNoBorder
                                            label="First name :"
                                            row="1"
                                            value={dataUser.firstName}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, firstName: e.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <div className="my-3">
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="male"
                                                    className="mr-3"
                                                    onChange={handleChangeGender}
                                                    value="male"
                                                    checked={dataUser.gender === "male" ? true : false}
                                                />
                                                <label htmlFor="male">Male</label>
                                            </div>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name="female"
                                                    className="mr-3"
                                                    onChange={handleChangeGender}
                                                    value="female"
                                                    checked={dataUser.gender === "female" ? true : false}
                                                />
                                                <label htmlFor="Female">Female</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-8">
                                        <InputNoBorder
                                            label="Last name :"
                                            row="1"
                                            value={dataUser.lastName}
                                            onChange={(e) => {
                                                setDataUser({ ...dataUser, lastName: e.target.value });
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <Modal
                            isOpen={toggleModal}
                            closeTimeoutMS={400}
                            className={style.modalSize}
                            overlayClassName={style.overlayConfig}
                            >
                                <div className="card-profil bg-white py-4 px-4 shadow" style={{width:"600px"}}>
                                    <div className="d-flex justify-content-between">
                                        <div className="align-self-center">
                                            <h4>Change Password</h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <InputNoBorder
                                                label="New Password :"
                                                type="password"
                                                placeholder='Write your new password'
                                                onChange={(e) => {
                                                    setPass({
                                                        ...pass,
                                                        newPassword : e.target.value,
                                                        message : {
                                                            ...pass.message,
                                                            newPassword : ''
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <p className="ml-3 text-danger">{pass.message.newPassword}</p>
                                        <div className="col-12">
                                            <InputNoBorder
                                                label="Confirm Password"
                                                type="password"
                                                placeholder='Write Again your new password'
                                                onChange={(e) => {
                                                    setPass({
                                                        ...pass,
                                                        confirmPassword : e.target.value,
                                                        message : {
                                                            ...pass.message,
                                                            confirmPassword : ''
                                                        }
                                                    })
                                                }}
                                            />
                                        </div>
                                        <p className="ml-3 text-danger">{pass.message.confirmPassword}</p>
                                        <div className="d-flex justify-content-end w-100">
                                            <CustomButton
                                                bgClr="#6A4029"
                                                brRad="1vw"
                                                btnPdg="1rem 3rem"
                                                ftSize="1.1rem"
                                                ftWg="bold"
                                                mrgn="0.33vw 1rem"
                                                txClr="white"
                                                value="Save"
                                                wd="200px"
                                                onClick={handleSubmitPass}
                                            ></CustomButton>
                                            <CustomButton
                                                bgClr="#FFBA33"
                                                brRad="1vw"
                                                btnPdg="1rem 3rem"
                                                ftSize="1.1rem"
                                                ftWg="bold"
                                                mrgn="0.33vw 1rem"
                                                txClr="#6A4029"
                                                value="Cancel"
                                                wd="200px"
                                                onClick={handleModal}
                                            ></CustomButton>
                                        </div>
                                    </div>
                                </div>
                            </Modal>
                        </div>
                        <div className="col-10 col-lg-4 my-2 my-lg-5 mx-auto">
                            <div className="mt-5 mt-lg-0">
                                <h4 className="text-white fw-700 pb-4">Do you want to save the change?</h4>
                                <div className="my-2">
                                    <CustomButton
                                        bgClr="#6A4029"
                                        brRad="1vw"
                                        btnPdg="1rem 3rem"
                                        ftSize="1.1rem"
                                        ftWg="bold"
                                        mrgn="0.33vw 0"
                                        txClr="white"
                                        value="Save Changes"
                                        wd="100%"
                                        onClick={handleSubmit}
                                    ></CustomButton>
                                    <CustomButton
                                        bgClr="#FFBA33"
                                        brRad="1vw"
                                        btnPdg="1rem 3rem"
                                        ftSize="1.1rem"
                                        ftWg="bold"
                                        mrgn="0.33vw 0"
                                        txClr="#6A4029"
                                        value="Cancel"
                                        wd="100%"
                                        onClick={handleCancel}
                                    ></CustomButton>
                                </div>
                                <div className="my-2">
                                    <CustomButton
                                        bgClr="#FFFFFF"
                                        brRad="1vw"
                                        btnPdg="1rem 3rem"
                                        ftSize="1.1rem"
                                        ftWg="bold"
                                        mrgn="0.33vw 0"
                                        txClr="#6A4029"
                                        value="Edit Password"
                                        wd="100%"
                                        onClick={handleModal}
                                    ></CustomButton>
                                    <CustomButton
                                        bgClr="#FFFFFF"
                                        brRad="1vw"
                                        btnPdg="1rem 3rem"
                                        ftSize="1.1rem"
                                        ftWg="bold"
                                        mrgn="0.33vw 0"
                                        txClr="#6A4029"
                                        value="Log Out"
                                        wd="100%"
                                        onClick={handleLogOut}
                                    ></CustomButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Profil;
