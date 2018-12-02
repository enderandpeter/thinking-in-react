import React from 'react'

export const FilterableProductTable = React.createClass({
    render() {
        return (
            <div id="productTable">
              <SearchBar />
              <ProductTable products={this.props.products} />
            </div>
        )
    }
})

export const SearchBar = React.createClass({
    render() {
        return (
            <div id="searchBar">
              <input type="text" id="search-text" name="search-text" placeholder="Search..." />
              <div>
                <label for="search-checkbox">
                  <input id="search-checkbox" name="search-checkbox" type="checkbox" />
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
    return (
      <tr className="productRow">
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
