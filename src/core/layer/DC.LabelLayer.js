/*
 * @Author: Caven
 * @Date: 2020-03-30 17:14:00
 * @Last Modified by: Caven
 * @Last Modified time: 2020-04-20 18:32:36
 */
import Cesium from '@/namespace'
import Layer from './Layer'

DC.LabelLayer = class extends Layer {
  constructor(id, url) {
    if (!url) {
      throw new Error('DC.LabelLayer：the url invalid')
    }
    super(id)
    this._dataSource = Cesium.GeoJsonDataSource.load(url)
    this._delegate = new Cesium.CustomDataSource(id)
    this._initLabel()
    this._state = DC.LayerState.INITIALIZED
    this.type = DC.LayerType.LABEL
  }

  _createLabel(entity) {
    if (entity.position && item.name) {
      return DC.Label.fromEntity(entity)
    }
  }

  _initLabel() {
    this._dataSource.then(dataSource => {
      let entities = dataSource.entities.values
      entities.forEach(item => {
        let lable = this._createLabel(item)
        this.addOverlay(lable)
      })
    })
  }
}

DC.LayerType.LABEL = 'label'
