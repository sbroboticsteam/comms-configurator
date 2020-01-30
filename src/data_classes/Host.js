'use strict'
/**
 * Host.js
 * 
 * This class represents each host (instance of Node class)
 * @author Julie Lee
 */
export default class Host {
    /**
     * Creates a host with a name & zero topics
     * @param {string} name name of the host
     */
    constructor(name) {
        this.name = name;
        this.topics = 0;
        this.pub = new Array();
        this.sub = new Array();
        this.req = new Array();
        this.rep = new Array();
    }

    /* Getters & setters */
    getName() { return this.name; }
    setName(name) { this.name = name; }
    getTopics() { return this.topics; }
    getPubTopics() { return this.pub; }
    getSubTopics() { return this.sub; }
    getReqTopics() { return this.req; }
    getRepTopics() { return this.rep; }

    addPubTopic(topic) { this.addTopic(this.pub, topic); }
    addSubTopic(topic) { this.addTopic(this.sub, topic); }
    addReqTopic(topic) { this.addTopic(this.req, topic); }
    addRepTopic(topic) { this.addTopic(this.rep, topic); }
    
    removePubTopic(topic) { this.removeTopic(this.pub, topic); }
    removeSubTopic(topic) { this.removeTopic(this.sub, topic); }
    removeReqTopic(topic) { this.removeTopic(this.req, topic); }
    removeRepTopic(topic) { this.removeTopic(this.rep, topic); }

    /**
     * Helper: Adds a topic to a list
     * @param {Array} topiclist list to add topic to
     * @param {string} topic name of topic
     * @returns 0 on success, -1 if error (duplicate topic)
     */
    addTopic(topiclist, topic) {
        let exists = this.pub.indexOf(topic) + this.sub.indexOf(topic) + this.req.indexOf(topic) + this.rep.indexOf(topic);
        if (exists > -4) return -1;
        topiclist.push(topic);
        this.topics += 1;
        return 0;
    }

    /**
     * Helper: Removes host from a topic
     * @param {Array} topiclist list in which topic resides
     * @param {string} topic id of topic to remove
     * @returns 0 on success, -1 if error (topic not found)
     */
    removeTopic(topiclist, topic) {
        let index = topiclist.indexOf(topic);
        if (index < 0) return -1;
        topiclist.splice(index, 1);
        this.topics -= 1;
        return 0;
    }
}