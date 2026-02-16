import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

export default function PizzaCalculator() {
  const [numPizzas, setNumPizzas] = useState(4);
  const [hydration, setHydration] = useState(62);
  const [breadFlour, setBreadFlour] = useState(80);
  const [wholeWheat, setWholeWheat] = useState(20);
  const [pizzaWeight, setPizzaWeight] = useState(273);
  const [poolishPercent, setPoolishPercent] = useState(30);
  
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    calculateRecipe();
  }, [numPizzas, hydration, breadFlour, wholeWheat, pizzaWeight, poolishPercent]);

  const calculateRecipe = () => {
    const totalDough = numPizzas * pizzaWeight;
    const salt = 2;
    const yeast = 0.3;
    
    const totalFlour = totalDough / (1 + (hydration/100) + (salt/100) + (yeast/100));
    const totalWater = totalFlour * (hydration / 100);
    const totalSalt = totalFlour * (salt / 100);
    const totalYeast = totalFlour * (yeast / 100);
    
    const breadFlourTotal = totalFlour * (breadFlour / 100);
    const wholeWheatTotal = totalFlour * (wholeWheat / 100);
    
    const poolishFlour = totalFlour * (poolishPercent / 100);
    const poolishWater = poolishFlour;
    const poolishYeast = totalYeast;
    
    const finalWater = totalWater - poolishWater;
    const finalBreadFlour = breadFlourTotal - poolishFlour;
    const finalWholeWheat = wholeWheatTotal;
    const finalSalt = totalSalt;
    
    setRecipe({
      poolish: {
        yeast: poolishYeast,
        water: poolishWater,
        breadFlour: poolishFlour
      },
      final: {
        water: finalWater,
        breadFlour: finalBreadFlour,
        wholeWheat: finalWholeWheat,
        salt: finalSalt
      },
      totals: {
        flour: totalFlour,
        water: totalWater,
        salt: totalSalt,
        yeast: totalYeast,
        dough: totalDough,
        poolishWeight: poolishFlour + poolishWater + poolishYeast
      }
    });
  };

  const round = (num) => Math.round(num * 10) / 10;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="text-orange-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Pizza Dough Calculator</h1>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Settings</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Pizzas
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={numPizzas}
                onChange={(e) => setNumPizzas(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pizza Weight (g)
              </label>
              <input
                type="number"
                min="100"
                max="500"
                value={pizzaWeight}
                onChange={(e) => setPizzaWeight(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hydration (%)
              </label>
              <input
                type="number"
                min="50"
                max="80"
                value={hydration}
                onChange={(e) => setHydration(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Poolish (% of total flour)
              </label>
              <input
                type="number"
                min="20"
                max="50"
                value={poolishPercent}
                onChange={(e) => setPoolishPercent(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <p className="text-xs text-gray-500 mt-1">Typical range: 20-40%</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bread Flour (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={breadFlour}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBreadFlour(val);
                  setWholeWheat(100 - val);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Whole Wheat Flour (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={wholeWheat}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setWholeWheat(val);
                  setBreadFlour(100 - val);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Poolish</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Dry Yeast:</span>
                  <span className="font-medium">{round(recipe.poolish?.yeast)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water:</span>
                  <span className="font-medium">{round(recipe.poolish?.water)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bread Flour:</span>
                  <span className="font-medium">{round(recipe.poolish?.breadFlour)}g</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="text-gray-600 font-medium">Total Poolish:</span>
                  <span className="font-medium">{round(recipe.totals?.poolishWeight)}g</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3 italic">Ferment 8-12 hours at 60-80°F</p>
            </div>

            <div className="bg-amber-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Final Dough</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">All the poolish</span>
                  <span className="font-medium">↑</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Water:</span>
                  <span className="font-medium">{round(recipe.final?.water)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bread Flour:</span>
                  <span className="font-medium">{round(recipe.final?.breadFlour)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Whole Wheat Flour:</span>
                  <span className="font-medium">{round(recipe.final?.wholeWheat)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Salt:</span>
                  <span className="font-medium">{round(recipe.final?.salt)}g</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Totals</h3>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Flour:</span>
                  <span className="font-medium">{round(recipe.totals?.flour)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Water:</span>
                  <span className="font-medium">{round(recipe.totals?.water)}g</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Dough:</span>
                  <span className="font-medium">{round(recipe.totals?.dough)}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1">
            <li>Mix the poolish and ferment 8-12 hours at 60-80°F</li>
            <li>Mix poolish and final dough ingredients with a butter knife. Rest 30 min</li>
            <li>Slap and fold with damp hands. Rest 30 min</li>
            <li>Round the dough. Ferment 1 hour</li>
            <li>Divide into {numPizzas} × {pizzaWeight}g balls. Rise 1-2 hours until doubled</li>
            <li>Bake and enjoy!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}