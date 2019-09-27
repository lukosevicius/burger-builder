import React, {Component, Fragment} from 'react'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIANT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        Axios.get('https://react-burger-3a4a9.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true})
            });
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {

        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Mantas",
                address:{
                    street: "Teststreet 45",
                    zip: '51514',
                    country: 'Lithuania'
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        };

        Axios.post('/orders.json', order)
            .then(() => {
                this.setState({loading: false, purchasing: false})
                })
            .catch(error => {
                console.log(error);
                this.setState({loading: false, purchasing: false});
            })
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    updatePurchaseState (updatedIngredients) {
        const ingredients = {
            ...updatedIngredients
        };

        const sum = Object.keys(ingredients)
            .map((key) =>{
                return ingredients[key]
            })
            .reduce( (sum, el) => {
                return sum + el;
            } );

        this.setState({purchasable: sum > 0})
    }


    addIngrediantHandler = (type) => { 
        const oldPrice = Number(this.state.totalPrice);
        const addition = Number(INGREDIANT_PRICES[type]);
        let newPrice = oldPrice + addition;
        newPrice = newPrice.toFixed(2);

        let updatedIngredients = {...this.state.ingredients};
        const ingrediantCount = updatedIngredients[type];
        updatedIngredients[type] = ingrediantCount + 1;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngrediantHandler = (type) => {

        const oldCount = this.state.ingredients[type];
        
        if (oldCount > 0) {
            
            const oldPrice = Number(this.state.totalPrice);
            const deduction = Number(INGREDIANT_PRICES[type]);
            let newPrice = oldPrice - deduction;
            
            let updatedIngredients = {...this.state.ingredients};
            const ingrediantCount = updatedIngredients[type];
            updatedIngredients[type] = ingrediantCount - 1;
            newPrice = newPrice.toFixed(2);
    
            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            })

            this.updatePurchaseState(updatedIngredients);
        }
    }

    
    render(){


        let disabledControls = {...this.state.ingredients}
        
        Object.keys(disabledControls)
            .map(key => {
                return disabledControls[key] = disabledControls[key] <= 0;
        });

        let burger = this.state.error ? <p>Page couldn't be loaded</p> : <Spinner />
        let orderSummary = null


        if(this.state.ingredients){
            burger = (
                <Fragment>                
                    <Burger types={this.state.ingredients}/>
                    <BuildControls 
                        addIngredients={this.addIngrediantHandler}
                        removeIngredients={this.removeIngrediantHandler}
                        disabled = {disabledControls}
                        price = {this.state.totalPrice}
                        purchasable = {this.state.purchasable}
                        ordered = {this.purchaseHandler} />
                </Fragment>);

            orderSummary = (
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    cancel={this.purchaseCancelHandler}
                    continue={this.purchaseContinueHandler} />)
        }

        if(this.state.loading){
            orderSummary = <Spinner />
        }


        return(
            <Fragment>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, Axios);