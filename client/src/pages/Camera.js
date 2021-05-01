import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";
const useStyles = makeStyles((theme) => ({
    root: {
        height: "100%",
        textAlign: 'center',
    },
    imgBox: {
        maxWidth: "80%",
        maxHeight: "80%",
        margin: "10px"
    },
    img: {
        height: "inherit",
        maxWidth: "inherit",
    },
    input: {
        display: "none"
    }
}));

function Camera() {
    const classes = useStyles();
    const [source, setSource] = useState("");
    const handleCapture = (target) => {
        if (target.files) {
            if (target.files.length !== 0) {
                const file = target.files[0];
                const newUrl = URL.createObjectURL(file);
                setSource(newUrl);
            }
        }
    };
    return ( <
        div className = { classes.root } >
        <
        Grid container >
        <
        Grid item xs = { 1 } > {
            source &&
            <
            Box display = ""
            justifyContent = "center"
            border = { 0 }
            className = { classes.imgBox } >
            <
            img src = { source }
            alt = { "snap" }
            className = { classes.img } > < /img> < /
            Box >
        } <
        input accept = "image/*"
        className = { classes.input }
        id = "icon-button-file"
        type = "file"
        capture = "environment"
        onChange = {
            (e) => handleCapture(e.target)
        }
        /> <
        label htmlFor = "icon-button-file" >
        <
        IconButton color = "primary"
        label = "upload picture"
        component = "span" >
        <
        PhotoCameraRoundedIcon fontSize = "small"
        color = "primary" / >
        <
        /IconButton> < /
        label > <
        /Grid> < /
        Grid > <
        /div>
    );
}
export default Camera;