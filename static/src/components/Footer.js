import React from 'react';

var style = {
    marginTop: '20px',
    textAlign: 'center',
    paddingLeft: '5px',
    paddingRight: '5px'
};

export function Footer() {
    return (
        <div style={style}>
            <p>
                Made by <a href="https://github.com/Detry322">Jack Serrino</a>. If you like it, think about buying me a coffee with <a href="https://venmo.com/Jack-Serrino?txn=pay&amount=3.00&note=Coffee">Venmo</a> or <a href="https://blockexplorer.com/address/14vhtn5ZYZwQfKT6YRerJaBUyRfFQ8HHLv">Bitcoin</a>. Email <a href="mailto:jserrino@mit.edu">jserrino@mit.edu</a> for comments/feature requests.
            </p>
        </div>
    );
}
