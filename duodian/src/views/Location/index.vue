<template>
    <div id="location">
        <div class="content">
            <div class="logo_img">
                <img src="https://static.dmall.com/kayak-project/address/dist/address/common/image/logo-slogan-new.png" alt="">
            </div>
            <div class="map_location">
                <div src="https://static.dmall.com/kayak-project/address/dist/address/common/image/map.png" alt="">
                    <img src="https://static.dmall.com/kayak-project/address/dist/address/common/image/geo-tag-large.png" alt="">
                </div>
                <p>正在定位</p>
            </div>
            <div class="direction">
                <img src="https://static.dmall.com/kayak-project/address/dist/address/common/image/slogan.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    #location {
        padding: 200px;
        .content {
            @include wh(100%, 100%);
            // @include flex(column, center, center);
            .logo_img {
                @include wh(100%, 170px);
                img {
                    @include wh(100%, 170px);
                }
            }
            .map_location {
                flex: 1;
                // @include flex(column, flex-start, center);
                div {
                    position: relative;
                    @include wh(300px, 300px);
                    background-image: url('https://static.dmall.com/kayak-project/address/dist/address/common/image/map.png');
                    background-position: 0 0;
                    background-size: 100% 100%;
                    border-radius: 50%;
                    margin: 100px 0;
                    animation: removeImg 3s 3;
                    @keyframes removeImg {
                        0% {
                            background-position: 0 0;
                        }
                        33% {
                            background-position: 0 -20px;
                        }
                        66% {
                            background-position: -20px 0;
                        }
                        100% {
                            background-position: 0 0;
                        }
                    }
                    img {
                        position: absolute;
                        @include wh(50px, 60px);
                        left: 50%;
                        top: 50%;
                        margin-left: -25px;
                        margin-top: -30px;
                        animation: locations 1s 10;
                    }
                    @keyframes locations{
                        0% {
                            transform: translate(0,0)
                        }
                        50% {
                            transform: translate(0,-10px)
                        }
                        100% {
                            transform: translate(0,0)
                        }
                    }
                }
                p {
                    font-size: 34px;

                }
            }
            .direction {
                @include wh(100%, 36px);
                img {
                   @include wh(100%, 36px);
                }
            }
        }
    }
</style>
