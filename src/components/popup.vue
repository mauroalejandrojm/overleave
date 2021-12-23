<template>
    <div class="container">
        <div class="title">
            <a class="icon"></a>
            <a id="title">Overleave</a>
        </div>
        <hr id="divider"/>
        <div id="sub-title1" class="body-text">
            <div>
                <a id="subtitle">Settings</a>
            </div>
            <div></div>
        </div>
        <div id="sub-title2" class="body-text">
            <div>
            <p id="item">
                Open compiled PDF in a new tab
            </p>   
            </div> 
            <div id="toggle">
                <label class="switch">
                    <input type="checkbox" id="input">
                    <span class="slider round" id="checkbox"></span>
                </label>
            </div>
            
        </div>
        <div id="sub-title3" class="body-text">
            <div>
                <button id="button_1">New Project</button>
            </div>
            <div>
                <button id="button_2">My Projects</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'popup'
}
</script>

<style src="../assets/styles/popup.scss" lang="scss">
</style>