import React from "react";
import PageHeader from "../../components/pageHeader";
import CustomButton from "../../components/customButton";

export default function SamplePage() {
    return (
        <>
            <PageHeader
                headerText={"App"}
                leftChild={<CustomButton btnNm={"왼쪽"}/>}
                rightChild={<CustomButton btnNm={"오른쪽"}/>}
            />
            <h2>App.js</h2>
            <img src={process.env.PUBLIC_URL + '/assets/emotion1.png'}/>
            <img src={process.env.PUBLIC_URL + '/assets/emotion2.png'}/>
            <img src={process.env.PUBLIC_URL + '/assets/emotion3.png'}/>
            <img src={process.env.PUBLIC_URL + '/assets/emotion4.png'}/>
            <img src={process.env.PUBLIC_URL + '/assets/emotion5.png'}/>
            <CustomButton
                btnNm="버튼"
                onClick={() => { alert("꺄")}}
                type={"positive"}
            />
            <CustomButton
                btnNm="버튼"
                onClick={() => { alert("꺄")}}
                type={"negative"}
            />
            <CustomButton
                btnNm="버튼"
                onClick={() => { alert("꺄")}}
            />
        </>
    )
}