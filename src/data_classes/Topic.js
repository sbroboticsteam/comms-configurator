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
            case "reqrep":
                this.req = conf.req;
                this.rep = conf.rep;
                break;
            default: console.log("ERROR: not a valid paradigm");
        }
        this.protocol = conf.protocol;
        this.address = conf.address;
        if (this.protocol === "tcp" || this.protocol === "udp") this.port = conf.port;
    }

    getId() { return this.id; }

    getParadigm() { return this.paradigm; }
    
    getHosts() {
        if (this.paradigm === "pubsub") {
            return { pub: this.pub, sub: this.sub };
        }
        else if (this.paradigm === "reqrep") {
            return { req: this.req, rep: this.rep };
        }
        return null;
    }

    hasHost(host) {
        if (this.paradigm === "pubsub") {
            if (this.pub === host || this.sub.includes(host)) return true;
            else return false;
        }
        else {
            if (this.rep === host || this.req === host) return true;
            else return false;
        }
    }

    getProtocolInfo() {
        let info = {};
        info.protocol = this.protocol;
        info.address = this.address;
        if (info.protocol === "tcp" || info.protocol === "udp") info.port = this.port;
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