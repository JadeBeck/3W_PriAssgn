const express = require('express');  //express 라이브러리를 express라는 변수에 담고
const router = express.Router();  //express라는 라이브러리 안의 라우터 함수를 실행해서 그 결괏값을 라우터라는 변수에 할당. 실제로 api를 만들거나 라우터를 생성할 때는 이렇게 router라는 변수를 통해 사용한당!
const Posts = require("../schemas/post.js");


//1. 전체 게시글 목록 조회 API
router.get("/posts", async (req, res) => {
    const item = await Posts.find().sort({updatedAt: -1})
    const mapItem = item.map((item) => {
        return {
            postId : item.postId,
            writer : item.writerName,
            title : item.title,
            content : item.contents,
            createdAt : item.createdAt
        }
    })
    res.json({item: mapItem});
});


//2. 게시글 상세 조회 API
router.get("/posts/:_postId", async (req, res) => {
    const {_postId} = req.params;
    //console.log(_postId)
    const item = await Posts.find();
    //console.log(item)
    const filteredPosts = item.filter((x) => x["_id"].toString() === _postId);
    const mapPosts = filteredPosts.map((item) => {
        return {
            postId : item.postId,
            writer : item.writerName,
            title : item.title,
            content : item.contents,
            createdAt : item.createdAt
        }
    })
    // const _postId = req.params._postId;
    // const [detail] = item.filter((item) => _id === _postId);
    res.json({mapPosts});
})


//3. 게시글 생성 API
router.post("/posts", async (req, res) => {
    const {title, writerName, password, contents} = req.body;
    const createdPosts = await Posts.create({title, writerName, password, contents});
    res.json({posts: createdPosts});
})


//4. 게시글 수정 API
router.put("/posts/:_postId", async (req, res) => {
    const {_postId} = req.params;
    const {password, contents, title} = req.body;
    const existsPosts = await Posts.find({_id: _postId});
    // console.log(existsPosts)
    // console.log(existsPosts[0].password)
    if (existsPosts.length) {
        if (password === existsPosts[0].password) {
            await Posts.updateOne({_id: _postId}, {$set: {contents, title}});
            console.log(_postId)
        } else {
            return res.status(400).json({success: false, errorMessage: "패스워드를 다시 입력해주세요"});
        }
    } else {
        return res.status(400).json({success: false, errorMessage: "찾으시는 게시물이 없어요"});
    }

    res.json({success: true});
})


//5. 게시글 삭제 API
router.delete("/posts/:_postId", async (req, res) => {
    const {_postId} = req.params;
    const existsPosts = await Posts.find({_id: _postId});
    const {password} = req.body;
    // console.log(existsPosts.length)
    // console.log(existsPosts)
    // console.log(existsPosts[0].password)
    // console.log(password)

    if (existsPosts.length) {
        if (password === existsPosts[0].password) {
            await Posts.deleteOne({_id: _postId});
        } else {
            return res.status(400).json({success: false, errorMessage: "패스워드를 다시 입력해주세요"});
        }
    } else {
        return res.status(400).json({success: false, errorMessage: "찾으시는 게시물이 없어요"});
    }

    res.json({result: "success"});
})


module.exports = router;