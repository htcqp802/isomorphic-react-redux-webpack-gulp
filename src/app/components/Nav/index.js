import React, {Component} from 'react';
import {Link} from 'react-router';
import {Drawer, MenuItem, AppBar, IconButton} from 'material-ui';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
    }
    handleToggle = () => this.setState({ open: !this.state.open })
    handleClose = () => this.setState({ open: false })
    render() {
        return (
            <div>
                <AppBar
                    onTouchTap={this.handleToggle}
                    />
                <Drawer
                    docked={false}
                    width={200}
                    open={this.state.open}
                    onRequestChange={(open) => this.setState({ open }) }
                    >
                    <AppBar
                        iconElementLeft={<IconButton onTouchTap={this.handleClose}><NavigationClose /></IconButton>}
                        />
                    <Link to="/" onTouchTap={this.handleClose}>
                        <MenuItem >
                            综合统计
                        </MenuItem>
                    </Link>
                    <Link to="/newUsers" onTouchTap={this.handleClose}>
                        <MenuItem >
                            新用户统计
                        </MenuItem>
                    </Link>
                    <Link to="/remainingAmount" onTouchTap={this.handleClose}>
                        <MenuItem >
                            平台剩余资金统计
                        </MenuItem>
                    </Link>
                </Drawer>
            </div>
        )
    }
}