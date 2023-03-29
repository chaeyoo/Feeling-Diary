import React from "react";

const EmotionItem = (props) => {
    const {emotion_id, emotion_img, emotion_description, onClick, isSelected} = props;
    return <div onClick={() => onClick(emotion_id)} className={["EmotionItem",
    isSelected ? `EmotionItem_on_${emotion_id}` :  `EmotionItem_off`].join(" ")}>
        <img src={emotion_img} alt="감정이미지"/>
        <span>{emotion_description}</span>
    </div>
};

export default React.memo(EmotionItem);