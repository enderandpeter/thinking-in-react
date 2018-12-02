import React from 'react'

export const FilterableProductTable = React.createClass({
  getInitialState() {
    this.state = {filterText: '', inStockOnly: false};
    return this.state;
  },
  handleUserInput(event) {
    switch(event.target.getAttribute('id')){
      case 'search-text':
        this.setState({
          filterText: event.target.value
        });
      break;
      case 'search-checkbox':
        this.setState({
          inStockOnly: event.target.checked
        });
      break;
    }
  },
  render() {
      return (
          <div id="productTable">
            <SearchBar
              handleUserInput={this.handleUserInput}
              filterText={this.state.filterText}
              inStockOnly={this.state.inStockOnly}
            />
            <ProductTable
              products={this.props.products}
              filterText={this.state.filterText}
              inStockOnly={this.state.inStockOnly}
            />
          </div>
      )
  }
})

export const SearchBar = React.createClass({
  handleChange(event){
    this.props.handleUserInput(event);
  },
  render() {
      return (
          <div id="searchBar">
            <input type="text" id="search-text" name="search-text" placeholder="Search..." value={this.props.filterText} onChange={this.handleChange} />
            <div>
              <label htmlFor="search-checkbox">
                <input id="search-checkbox" name="search-checkbox" type="checkbox" checked={this.props.inStockOnly} onChange={this.handleChange} />
                <span>In-Stock Only</span>
              </label>
            </div>
          </div>
      )
  }
})

export const ProductCategoryRow = React.createClass({
  render() {
    return (
      <tr className="productCategoryRow">
        <th>
          {this.props.category}
        </th>
      </tr>
    )
  }
})

export const ProductRow = React.createClass({
  render() {
    let style = !this.props.product.stocked ? {color: 'red'} : {};
    return (
      <tr className="productRow" style={style}>
        <td className="productName">{this.props.product.name}</td>
        <td className="productPrice">{this.props.product.price}</td>
      </tr>
    )
  }
})

export const ProductTable = React.createClass({
    render() {
      let productTableRows = [];
      let currentCategory = '';

      this.props.products.forEach((product, index) => {
        if(product.category !== currentCategory){
          productTableRows.push(<ProductCategoryRow key={product.category} category={product.category} />);
          currentCategory = product.category;
        }

        if(this.props.inStockOnly && !product.stocked){
          return;
        }

        if(product.name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1){
          return;
        }

        productTableRows.push(<ProductRow key={product.name} product={product} />);
      });

      return (
          <table id="productTable">
            <tbody>
              {productTableRows}
            </tbody>
          </table>
      )
    }
})
