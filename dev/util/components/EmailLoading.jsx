import React from 'react';
// import "./email.module.css";
export default function WaitForGmailVerification(props){
    return <div style={{
        height:"300px",
        marginBottom:"10px"
    }}>
        <div>
        <div id="loading">   
    <div id="d1">
        <div id="d2"></div>
    </div>
    <div id="d3" >
        <div id="d4" ></div>
        <div id="d5" >
            <div id="d6" >
                <div id="d7">
                    <div id="d8"></div>
                    <div id="d9">
                        <div id="d10">
                            <div id="d11"></div>
                        </div>
                        <div id="d12"></div>
                    </div>
                    <div id="d13">
                        <div id="d14"></div>
                        <div id="d15"></div>
                        <div id="d16"></div>
                    </div>
                    <div id="d17"></div>
                </div>
                <div id="d18">
                    <div id="d19">
                        <div id="d20"></div>
                        <div id="d21">
                            <div id="d22"></div>
                            <div id="d23"></div>
                            <div id="d24"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="nlpt"></div>
        <div id="d25" className="msg">Sending Gmail&hellip;</div>
        <p>Open your Gmail and verify your account.</p>
    </div>
</div>
</div>
<style jsx>{`
    #loading {
        margin-top:200px;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background-color: #fff;
        margin-bottom:10px;
    }
    
    .msg {
        color: #757575;
        font: 20px/20px Arial, sans-serif;
        letter-spacing: .2px;
        text-align: center;
    }
    
    #nlpt {
        animation: a-s .5s 2.5s 1 forwards;
        background-color: #f1f1f1;
        height: 4px;
        margin: 56px auto 20px;
        opacity: 0;
        overflow: hidden;
        position: relative;
        width: 300px;
    }
    
    #nlpt::before {
        animation: a-lb 20s 3s linear forwards;
        background-color: #db4437;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        transform: translateX(-300px);
        width: 100%;
    }
    
    @keyframes a-lb {
        0% {
            transform: translateX(-300px);
        }
        5% {
            transform: translateX(-240px);
        }
        15% {
            transform: translateX(-30px);
        }
        25% {
            transform: translateX(-30px);
        }
        30% {
            transform: translateX(-20px);
        }
        45% {
            transform: translateX(-20px);
        }
        50% {
            transform: translateX(-15px);
        }
        65% {
            transform: translateX(-15px);
        }
        70% {
            transform: translateX(-10px);
        }
        95% {
            transform: translateX(-10px);
        }
        100% {
            transform: translateX(-5px);
        }
    }
    
    @keyframes a-s {
        100% {
            opacity: 1;
        }
    }
    
    @keyframes a-h {
        100% {
            opacity: 0;
        }
    }
    
    @keyframes a-nt {
        100% {
            transform: none;
        }
    }
    
    @keyframes a-e {
        43% {
            animation-timing-function: cubic-bezier(.8, 0, .2, 1);
            transform: scale(.75);
        }
        60% {
            animation-timing-function: cubic-bezier(.8, 0, 1, 1);
            transform: translateY(-16px);
        }
        77% {
            animation-timing-function: cubic-bezier(.16, 0, .2, 1);
            transform: none;
        }
        89% {
            animation-timing-function: cubic-bezier(.8, 0, 1, 1);
            transform: translateY(-5px);
        }
        100% {
            transform: none;
        }
    }
    
    @keyframes a-ef {
        24% {
            animation-timing-function: cubic-bezier(.8, 0, .6, 1);
            transform: scaleY(.42);
        }
        52% {
            animation-timing-function: cubic-bezier(.63, 0, .2, 1);
            transform: scaleY(.98);
        }
        83% {
            animation-timing-function: cubic-bezier(.8, 0, .84, 1);
            transform: scaleY(.96);
        }
        100% {
            transform: none;
        }
    }
    
    @keyframes a-efs {
        24% {
            animation-timing-function: cubic-bezier(.8, 0, .6, 1);
            opacity: .3;
        }
        52% {
            animation-timing-function: cubic-bezier(.63, 0, .2, 1);
            opacity: .03;
        }
        83% {
            animation-timing-function: cubic-bezier(.8, 0, .84, 1);
            opacity: .05;
        }
        100% {
            opacity: 0;
        }
    }
    
    @keyframes a-es {
        24% {
            animation-timing-function: cubic-bezier(.8, 0, .6, 1);
            transform: rotate(-25deg);
        }
        52% {
            animation-timing-function: cubic-bezier(.63, 0, .2, 1);
            transform: rotate(-42.5deg);
        }
        83% {
            animation-timing-function: cubic-bezier(.8, 0, .84, 1);
            transform: rotate(-42deg);
        }
        100% {
            transform: rotate(-43deg);
        }
    }
    
    .invfr {
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        width: 0;
        height: 0;
        border: 0;
    }
    
    .msgb {
        position: absolute;
        right: 0;
        font-size: 12px;
        font-weight: normal;
        color: #000;
        padding: 20px;
    }
    
    #d1{
        bottom:0;left:0;overflow:hidden;position:absolute;right:0;top:0;
    }
    
    #d2{
        animation:a-h .5s 1.25s 1 linear forwards,a-nt .6s 1.25s 1 cubic-bezier(0,0,.2,1);background:#eee;border-radius:50%;height:800px;left:50%;margin:-448px -400px 0;position:absolute;top:50%;transform:scale(0);width:800px;
    }
    #d3{
        height:100%;text-align:center;
    }
    #d4{
        height:50%;margin:0 0 -140px;
    }
    #d5{
        height:128px;margin:0 auto;position:relative;width:176px;
    }
    #d6{
        animation:a-s .5s .5s 1 linear forwards,a-e 1.75s .5s 1 cubic-bezier(0,0,.67,1) forwards;opacity:0;transform:scale(.68);
    }
    #d7{
        background:#ddd;border-radius:12px;box-shadow:0 15px 15px -15px rgba(0,0,0,.3);height:128px;left:0;overflow:hidden;position:absolute;top:0;transform:scale(1);width:176px;
    }
    #d8{
        animation:a-nt .667s 1.5s 1 cubic-bezier(.4,0,.2,1) forwards;background:#d23f31;border-radius:50%;height:270px;left:88px;margin:-135px;position:absolute;top:25px;transform:scale(.5);width:270px;
    }
    #d9{
        height:128px;left:20px;overflow:hidden;position:absolute;top:0;transform:scale(1);width:136px;
    }
    #d10{
        background:#e1e1e1;height:128px;left:0;position:absolute;top:0;width:68px;
    }
    
    #d11{
        animation:a-h .25s 1.25s 1 forwards;background:#eee;height:128px;left:0;opacity:1;position:absolute;top:0;width:68px;
    }
    #d12{
        background:#eee;height:100px;left:1px;position:absolute;top:56px;transform:scaleY(.73)rotate(135deg);width:200px;
    }
    #d13{
        background:#bbb;height:176px;left:0;position:absolute;top:-100px;transform:scaleY(.73)rotate(135deg);width:176px;
    }
    #d14{
        background:#eee;border-radius:12px 12px 0 0;bottom:117px;height:12px;left:55px;position:absolute;transform:rotate(-135deg)scaleY(1.37);width:136px;
    }
    #d15{
        background:#eee;height:96px;position:absolute;right:0;top:0;width:96px;
    }
    #d16{
        box-shadow:inset 0 0 10px #888;height:155px;position:absolute;right:0;top:0;width:155px;
    }
    #d17{
        animation:a-s .167s 1.283s 1 linear forwards,a-es 1.184s 1.283s 1 cubic-bezier(.4,0,.2,1) forwards;background:linear-gradient(0,rgba(38,38,38,0),rgba(38,38,38,.2));height:225px;left:0;opacity:0;position:absolute;top:0;transform:rotate(-43deg);transform-origin:0 13px;width:176px;
    }
    #d18{
        animation:a-ef 1.184s 1.283s 1 cubic-bezier(.4,0,.2,1) forwards;border-radius:12px;height:100px;left:0;overflow:hidden;position:absolute;top:0;transform:scaleY(1);transform-origin:top;width:176px;
    }
    #d19{
        height:176px;left:0;position:absolute;top:-100px;transform:scaleY(.73)rotate(135deg);width:176px;
    }
    #d20{
        animation:a-s .167s 1.283s 1 linear forwards;box-shadow:-5px 0 12px rgba(0,0,0,.5);height:176px;left:0;opacity:0;position:absolute;top:0;width:176px;
    }
    
    #d21{
        background:#ddd;height:176px;left:0;overflow:hidden;position:absolute;top:0;width:176px;
    }
    #d22{
        animation:a-nt .667s 1.25s 1 cubic-bezier(.4,0,.2,1) forwards;background:#db4437;border-radius:50%;bottom:41px;height:225px;left:41px;position:absolute;transform:scale(0);width:225px;
    }
    #d23{
        background:#f1f1f1;height:128px;left:24px;position:absolute;top:24px;transform:rotate(90deg);width:128px;
    }
    #d24{
        animation:a-efs 1.184s 1.283s 1 cubic-bezier(.4,0,.2,1) forwards;background:#fff;height:176px;opacity:0;transform:rotate(90deg);width:176px;
    }
    #d25{
        animation:a-s .25s 1.25s 1 forwards;opacity:0;
        color: rgb(3, 19, 238);
    }
`}
</style>
</div>
}