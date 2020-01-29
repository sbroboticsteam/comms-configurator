'use strict'
/**
 * Topic.js
 * 
 * This class represents each topic
 * @author Julie Lee
 */
export default class Topic {
    /**
     * Creates a topic with existing configs
     * @param {*} conf all configs of topic
     */
    constructor(conf) {
        this.id = conf.id;
        this.paradigm = conf.paradigm;
        switch(this.paradigm) {
            case "pubsub":
                this.pub = conf.pub;
                this.sub = conf.sub;
                break;
            default: console.log("ERROR: not a valid paradigm");
        }
        this.protocol = conf.protocol;
        this.address = conf.address;
        if (this.protocol === "tcp") this.port = conf.port;
    }

    getId() { return this.id; }

    getParadigm() { return this.paradigm; }
    
    getHosts() {
        if (this.paradigm === "pubsub") {
            return { pub: this.pub, sub: this.sub };
        }
        return null;
    }

    getProtocolInfo() {
        let info = {};
        info.protocol = this.protocol;
        info.address = this.address;
        if (info.protocol === "tcp") info.port = this.port;
        return info;
    }

    setId(id) { this.id = id; }
    setParadigm(paradigm) { this.paradigm = paradigm; }
    setProtocol(protocol) { this.protocol = protocol; }
    setAddress(addr) { this.address = addr; }
    setPort(port) { this.port = port; }
    
    addSub(sub) { this.sub.push(sub); }
    removeSub(sub) {
        let index = this.sub.indexOf(sub);
        if (index < 0) return -1;
        this.sub.splice(index, 1);
        return 0;
    }
}