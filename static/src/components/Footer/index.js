import React from 'react';

/* component styles */
import { styles } from './styles.scss';

export function Footer() {
    return (
        <div>
            <footer className={`${styles}`}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <p>
                                Made by <a href="https://github.com/Detry322">Jack Serrino</a>. If you like it, buy me a coffee with <a href="https://venmo.com/Jack-Serrino?txn=pay&amount=3.00&note=Coffee">Venmo</a> or <a href="https://blockexplorer.com/address/14vhtn5ZYZwQfKT6YRerJaBUyRfFQ8HHLv">Bitcoin</a>. Email <a href="mailto:jserrino@mit.edu">jserrino@mit.edu</a> for comments/feature requests.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
