import React, { Component } from 'react';
import { v4 as uuid } from 'uuid';

class TTable extends Component {
    state = {}
    handleLinkClick(link) {
        window.location.href = link
    }

    render() {
        const { torrents } = this.props
        return (
            <div className="row my-4">
                <div className="col position-relative">

                    <h3 className="col-md-12">Downloads</h3>
                    <table className="bg-details table-responsive-xl torrent-table posterImage">
                        <thead className="">
                            <tr className="">
                                <th>Name</th>
                                <th>Provider</th>
                                <th>Seeders</th>
                                <th>Peers</th>
                                <th>Size</th>
                                <th>Magnet</th>
                                {/* <th>Link</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                torrents.map(torrent =>
                                    <tr key={uuid()}>
                                        <td onClick={() => this.handleLinkClick(torrent.desc)}>{torrent.title}</td>
                                        <td>{torrent.provider}</td>
                                        <td>{torrent.seeds}</td>
                                        <td>{torrent.peers}</td>
                                        <td>{torrent.size}</td>
                                        <td className="text-center"><i onClick={() => this.handleLinkClick(torrent.magnet)} className="fa fa-magnet"></i></td>
                                        {/* <td className="text-center"><i onClick={() => this.handleLinkClick(torrent.desc)} className="fa fa-link"></i>  </td> */}
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>);
    }
}

export default TTable;