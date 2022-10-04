const express = require('express');

const Comments = require("../schemas/comment.js");
const Posts = require("../schemas/post")

const router = express.Router();


//1. 댓글 목록 조회
router.get("/comments/:_postId", async (req, res) => {
    const {_postId} = req.params;  //게시물 ID 하나하나
    console.log(_postId)
    const existsPosts = await Comments.find({_postId: _postId}).sort({updatedAt: -1});
    //[  //find라서 배열을 뱉을것
    // {
    //     "writerName" : "ㄷaaa",
    //     "password" : "0000",
    //     "contents" : "hhhh"
    // }
    // ]   //20번째줄의 item은 배열 자체가 아니라 안의 요소 하나하나
    const mapComments = existsPosts.map((x) => {
        return {
            writer: x.writerName,
            contents: x.contents
        }
        // {
        //     xN : "ㄷaaa", xC :"hhhh"
        // }
    })
    //console.log(existsPosts)
    res.json({mapComments});
});


//2. 댓글 작성
router.post("/comments/:_postId", async (req, res) => {
    const {_postId} = req.params;
    const {writerName, password, contents} = req.body;
    console.log(contents)
    if (contents === "") {
        //res.send ("끗")
        return res.status(400).json({success: false, errorMessage: "댓글 내용을 입력해주세요"});
    } else {
        const createdComments = await Comments.create({_postId, writerName, password, contents});
        res.json({comments: createdComments});
    }
})


//3. 댓글 수정
router.put("/comments/:commentId", async (req, res) => {
    const {commentId} = req.params;
    const {password, contents} = req.body;
    const existsComments = await Comments.findOne({_id: commentId});
    // console.log(req.params)
    // console.log(req.body)
    // console.log(existsComments)
    // console.log(password)
    // console.log(existsComments.password)
    if (password === existsComments.password) {
        if (contents === "") {
            res.status(400).json({success: false, errorMessage: "댓글 내용을 입력해주세요"});
        } else {
            await Comments.updateOne({_id: commentId}, {$set: {contents}});
            res.send({result: "수정완료"})
        }
    } else {
        return res.status(400).json({success: false, errorMessage: "틀린 패스워드"});
    }
})


//4. 댓글 삭제
router.delete("/comments/:commentId", async (req, res) => {
    const {commentId} = req.params;
    const {password} = req.body;
    const existsComments = await Comments.findOne({_id: commentId});
    // console.log(req.params)
    // console.log(req.body)
    // console.log(existsComments)
    // console.log(password)
    // console.log(existsComments.password)
    if (password === existsComments.password) {
        await Comments.deleteOne({_id: commentId});
    } else {
        return res.status(400).json({success: false, errorMessage: "틀린 패스워드"});
    }
    res.json({result: "success"});
})

module.exports = router;