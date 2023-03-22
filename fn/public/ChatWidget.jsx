import React, { Component, useEffect } from 'react'
import moment from 'moment'
import $ from 'jquery'
const App = () => {
    // useEffect(() => {
    //     return () => {
    //         $('.messages').animate({ scrollTop: $(document).height() }, 'fast')

    //         $('#profile-img').click(function () {
    //             $('#status-options').toggleClass('active')
    //         })

    //         $('.expand-button').click(function () {
    //             $('#profile').toggleClass('expanded')
    //             $('#contacts').toggleClass('expanded')
    //         })

    //         $('#status-options ul li').click(function () {
    //             $('#profile-img').removeClass()
    //             $('#status-online').removeClass('active')
    //             $('#status-away').removeClass('active')
    //             $('#status-busy').removeClass('active')
    //             $('#status-offline').removeClass('active')
    //             $(this).addClass('active')

    //             if ($('#status-online').hasClass('active')) {
    //                 $('#profile-img').addClass('online')
    //             } else if ($('#status-away').hasClass('active')) {
    //                 $('#profile-img').addClass('away')
    //             } else if ($('#status-busy').hasClass('active')) {
    //                 $('#profile-img').addClass('busy')
    //             } else if ($('#status-offline').hasClass('active')) {
    //                 $('#profile-img').addClass('offline')
    //             } else {
    //                 $('#profile-img').removeClass()
    //             }

    //             $('#status-options').removeClass('active')
    //         })

    //         function newMessage() {
    //             message = $('.message-input input').val()
    //             if ($.trim(message) == '') {
    //                 return false
    //             }
    //             $(
    //                 '<li class="sent"><img src="http://emilcarlsson.se/assets/mikeross.png" alt="" /><p>' +
    //                     message +
    //                     '</p></li>'
    //             ).appendTo($('.messages ul'))
    //             $('.message-input input').val(null)
    //             $('.contact.active .preview').html('<span>You: </span>' + message)
    //             $('.messages').animate({ scrollTop: $(document).height() }, 'fast')
    //         }

    //         $('.submit').click(function () {
    //             newMessage()
    //         })

    //         $(window).on('keydown', function (e) {
    //             if (e.which == 13) {
    //                 newMessage()
    //                 return false
    //             }
    //         })
    //     }
    // })
    return (
        <div id="frame">
            <div id="sidepanel">
                <div id="profile">
                    <div className="wrap">
                        {/* <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt /> */}
                        <p>Mike Ross</p>
                        <i className="fa fa-chevron-down expand-button" aria-hidden="true" />
                        <div id="status-options">
                            <ul>
                                <li id="status-online" className="active">
                                    <span className="status-circle" /> <p>Online</p>
                                </li>
                                <li id="status-away">
                                    <span className="status-circle" /> <p>Away</p>
                                </li>
                                <li id="status-busy">
                                    <span className="status-circle" /> <p>Busy</p>
                                </li>
                                <li id="status-offline">
                                    <span className="status-circle" /> <p>Offline</p>
                                </li>
                            </ul>
                        </div>
                        <div id="expanded">
                            <label htmlFor="twitter">
                                <i className="fa fa-facebook fa-fw" aria-hidden="true" />
                            </label>
                            <input name="twitter" type="text" defaultValue="mikeross" />
                            <label htmlFor="twitter">
                                <i className="fa fa-twitter fa-fw" aria-hidden="true" />
                            </label>
                            <input name="twitter" type="text" defaultValue="ross81" />
                            <label htmlFor="twitter">
                                <i className="fa fa-instagram fa-fw" aria-hidden="true" />
                            </label>
                            <input name="twitter" type="text" defaultValue="mike.ross" />
                        </div>
                    </div>
                </div>
                <div id="search">
                    <label htmlFor>
                        <i className="fa fa-search" aria-hidden="true" />
                    </label>
                    <input type="text" placeholder="Search contacts..." />
                </div>
                <div id="contacts">
                    <ul>
                        <li className="contact active">
                            <div className="wrap">
                                <span className="contact-status busy" />
                                <div className="meta">
                                    <p className="name">6282284733404</p>
                                    <p className="preview">info</p>
                                </div>
                            </div>
                        </li>
                        {/* <li className="contact">
                            <div className="wrap">
                                <span className="contact-status away" />
                                <img src="http://emilcarlsson.se/assets/rachelzane.png" alt />
                                <div className="meta">
                                    <p className="name">Rachel Zane</p>
                                    <p className="preview">
                                        I was thinking that we could have chicken tonight, sounds good?
                                    </p>
                                </div>
                            </div>
                        </li> */}
                    </ul>
                </div>
                <div id="bottom-bar">
                    <button id="addcontact">
                        <i className="fa fa-user-plus fa-fw" aria-hidden="true" /> <span>Tambah Kontak</span>
                    </button>
                    <button id="settings">
                        <i className="fa fa-cog fa-fw" aria-hidden="true" /> <span>Settings</span>
                    </button>
                </div>
            </div>
            <div className="content">
                <div className="contact-profile">
                    <img src={`http://emilcarlsson.se/assets/harveyspecter.png`} alt />
                    <p>Harvey Specter</p>
                    <div className="social-media">
                        <i className="fa fa-facebook" aria-hidden="true" />
                        <i className="fa fa-twitter" aria-hidden="true" />
                        <i className="fa fa-instagram" aria-hidden="true" />
                    </div>
                </div>
                <div className="messages">
                    <ul>
                        <li className="sent">
                            <span> {moment().format('Y-m-d')}</span>
                            <p>
                                How the hell am I supposed to get a jury to believe you when I am not even sure that I
                                do?!
                            </p>
                        </li>
                        <li className="replies">
                            <span> {moment().format('Y-m-d')}</span>
                            <p>When you're backed against the wall, break the god damn thing down.</p>
                        </li>
                    </ul>
                </div>
                <div className="message-input">
                    <div className="wrap">
                        <input type="text" placeholder="Write your message..." />
                        <i className="fa fa-paperclip attachment" aria-hidden="true" />
                        <button className="submit">
                            <i className="fa fa-paper-plane" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
