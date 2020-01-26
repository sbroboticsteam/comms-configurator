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
    }

    /* Getters & setters */
    getName() { return this.name; }
    setName(name) { this.name = name; }
    getTopics() { return this.topics; }
    getPubTopics() { return this.pub; }
    getSubTopics() { return this.sub; }

    /**
     * Adds a topic in which the host is publisher
     * @param {string} topic name of topic
     * @returns 0 on success, -1 if error (duplicate topic)
     */
    addPubTopic(topic) {
        let exists = this.pub.indexOf(topic) + this.sub.indexOf(topic);
        if (exists > -2) return -1;
        this.pub.push(topic);
        this.topics += 1;
        return 0;
    }

    /**
     * Adds a topic in which the host is subscriber
     * @param {string} topic id of topic
     * @returns 0 on success, -1 if error (duplicate topic)
     */
    addSubTopic(topic) {
        let exists = this.pub.indexOf(topic) + this.sub.indexOf(topic);
        if (exists > -2) return -1;
        this.sub.push(topic);
        this.topics += 1;
        return 0;
    }

    /**
     * Removes host from a topic in which it is publisher
     * @param {string} topic id of topic to remove
     * @returns 0 on success, -1 if error (topic not found)
     */
    removePubTopic(topic) {
        let index = this.pub.indexOf(topic);
        if (index < 0) return -1;
        this.pub.splice(index, 1);
        this.topics -= 1;
        return 0;
    }

    /**
     * Removes host from a topic in which it is subscriber
     * @param {string} topic id of topic to remove
     * @returns 0 on success, -1 if error (topic not found)
     */
    removeSubTopic(topic) {
        let index = this.sub.indexOf(topic);
        if (index < 0) return -1;
        this.sub.splice(index, 1);
        this.topics -= 1;
        return 0;
    }
}