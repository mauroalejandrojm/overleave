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
                    <input type="checkbox" id="input" :checked="toggle_status=='true'">
                    <span class="slider round" id="checkbox" @click="onclick_checkbox"></span>
                </label>
            </div>
            
        </div>
        <div id="sub-title3" class="body-text">
            <div>
                <button id="button_1" @click="onclick_left">New Project</button>
            </div>
            <div>
                <button id="button_2" @click="onclick_right">My Projects</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'popup',
    data() { 
        return {
            url: null,
            toggle_status: null,
            toggle_element: {checked: null} 
        }
    },
    created() {
        chrome.storage.local.get('toggle_status', (data) =>{
            this.toggle_status = data["toggle_status"];
            console.log(this.toggle_status);
            if ( (this.toggle_status===null) || (this.toggle_status=='false') ) {
                this.toggle_status = 'false';
                this.toggle_element.checked = "";
            }
            else {
                this.toggle_element.checked = this.toggle_status;
            }
        });
    },
    methods: {
        onclick_checkbox() {
            chrome.tabs.query({currentWindow: true, active: true}, 
                function (tabs) {
                    this.url = tabs[0].url;
                    this.url = this.url.match("https://www.overleaf.com/project/*");
                    if (this.url !== null) {
                        chrome.storage.local.get('toggle_status', (data) =>{
                            this.toggle_status = data["toggle_status"];
                            if (this.toggle_status == 'false') {
                                chrome.storage.local.set({"toggle_status": 'true'});
                                chrome.tabs.sendMessage(tabs[0].id, 'true');
                                chrome.browserAction.setIcon({path: '../icons/overleave-active.png'});
                            }
                            else {
                                chrome.storage.local.set({"toggle_status": 'false'});
                                chrome.tabs.sendMessage(tabs[0].id, 'false');
                                chrome.browserAction.setIcon({path: '../icons/icon-16x16.png'});
                            }
                        });
                    }
            });
        },
        onclick_left() {
            chrome.tabs.query({currentWindow: true, active: true}, 
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, 'new_project');
            });
        },
        onclick_right() {
            chrome.tabs.query({currentWindow: true, active: true}, 
                function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, 'projects');
            });
        }
    }
}
</script>

<style src="../assets/scss/popup.scss" lang="scss">
</style>