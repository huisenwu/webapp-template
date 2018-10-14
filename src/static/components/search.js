import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            style={{marginTop: 16}}
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                    input: classes.inputInput,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion.label}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion.label}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(value, searchSuggestions) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : searchSuggestions?.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

class DownshiftMultiple extends React.Component {
    state = {
        inputValue: '',
        selectedItem: [],
        searchSuggestions: [],
        searchTags: []
    };

    componentDidMount() {
        this.search(this.props.searchType);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        if(this.props.searchType !== nextProps.searchType) this.search(nextProps.searchType);
    }
    search(searchType) {
        //Load search suggestions
        if(!searchType) return;
        fetch(`/api/tags/type?type=${searchType}`).then(response => response.json())
            .then(tags => {
                const searchTags = tags.map(tag => {
                    tag.label = tag.name;
                    return tag;
                });
                this.setState({searchTags});
            });

    }
    handleKeyDown = event => {
        const { inputValue, selectedItem } = this.state;
        if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
            this.setState({
                selectedItem: selectedItem.slice(0, selectedItem.length - 1),
            });
        }
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    handleChange = (item) => {
        let { selectedItem } = this.state;

        if (selectedItem.indexOf(item) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.setState({
            inputValue: '',
            selectedItem,
        }, () => this.props.onSearch(this.state.selectedItem));
    };

    handleDelete = item => () => {
        this.setState(state => {
            const selectedItem = [...state.selectedItem];
            selectedItem.splice(selectedItem.indexOf(item), 1);
            return { selectedItem };
        }, () => this.props.onSearch(this.state.selectedItem));
    };

    render() {
        const { classes, searchName, placeHolder } = this.props;
        const { inputValue, selectedItem } = this.state;
        return (
            <Downshift
                id="downshift-multiple"
                inputValue={inputValue}
                onChange={this.handleChange}
                selectedItem={selectedItem}
            >
                {({
                      getInputProps,
                      getItemProps,
                      isOpen,
                      inputValue: inputValue2,
                      selectedItem: selectedItem2,
                      highlightedIndex,
                  }) => (
                    <div className={classes.container}>
                        {renderInput({
                            fullWidth: true,
                            classes,
                            InputProps: getInputProps({
                                startAdornment: selectedItem.map(item => (
                                    <Chip
                                        key={item.id}
                                        tabIndex={-1}
                                        label={item.name}
                                        className={classes.chip}
                                        onDelete={this.handleDelete(item)}
                                    />
                                )),
                                onChange: this.handleInputChange,
                                onKeyDown: this.handleKeyDown,
                                placeholder: placeHolder
                            }),
                            label: searchName,
                        })}
                        {isOpen ? (
                            <Paper className={classes.paper} square>
                                {getSuggestions(inputValue2, this.state.searchTags).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                    }),
                                )}
                            </Paper>
                        ) : null}
                    </div>
                )}
            </Downshift>
        );
    }
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func,
    searchType: PropTypes.string,
    searchName: PropTypes.string,
    placeHolder: PropTypes.string

};
DownshiftMultiple.defaultProps = {
    onSearch: PropTypes.func,
    searchType: null,
    searchName: null,
    placeHolder: null
};

const styles = theme => ({
    root: {
        height: 85,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
        backgroundColor: "darkGray",
        color: "white"
    },
    inputRoot: {
        marginTop: 16
    },
    inputInput: {
        width: 'auto',
        flexGrow: 1,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function Search(props) {
    const { classes, onSearch, searchName, searchType, placeHolder} = props;

    return (
        <div className={classes.root}>
            <DownshiftMultiple classes={classes} onSearch={onSearch} searchType={searchType} searchName={searchName} placeHolder={placeHolder}/>
        </div>
    );
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
    onSearch: PropTypes.func,
    searchType: PropTypes.string,
    searchName: PropTypes.string,
    placeHolder: PropTypes.string,
};
Search.defaultProps = {
    onSearch: null,
    searchType: null,
    searchName: null,
    placeHolder: null
};

export default withStyles(styles)(Search);