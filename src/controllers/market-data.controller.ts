import { RequestHandler } from 'express';
import { MarketData } from '../database/models/MarketData';
import { Token } from '../database/models/Token';

export const lastPrice: RequestHandler = async (req, res) => {
  const { tkn_id } = req.params;
  try {    
    let content = await MarketData.findOneOrFail({ 
      where: { md_token_id: {tkn_id}}, 
      relations: {md_token_id: true},
      order: {md_date_history: 'DESC'},
      select: {
        id: true,
        md_current_price: true,
        md_volume: true,
        md_date_history: true,
        md_token_id: {
          tkn_id: true,
          tkn_tricker: true,
          tkn_name: true
        }
      }
    });

    return res.status(200).json(content);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const history: RequestHandler = async (req, res) => {
  const { tkn_id } = req.params;
  try {
    let [content, contentCount] = await MarketData.findAndCount({ 
      where: { md_token_id: {tkn_id}}, 
      take: req.query.size ?? 15,
      skip: ((req.query.page ?? 0) * (req.query.size ?? 15)),
      order: {updated_at: 'DESC'},
      select: {
        id: true,
        md_current_price: true,
        md_volume: true,
        md_date_history: true,
        updated_at: true
      }
    });

    return res.status(200).json({
      token_id: tkn_id,
      content,
      total_pages: Math.ceil(contentCount / (req.query.size ?? 15)),
    });
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const store: RequestHandler = async (req, res) => {
  const { md_current_price, md_volume, md_date_history, tkn_id } = req.body;
  try {
    let md_token_id = await Token.findOneOrFail({ 
      where: { tkn_id},
    });

    await MarketData.save({
      md_token_id,
      md_current_price,
      md_volume,
      md_date_history
    });

    return res.status(201).json({msg: 'Price of token stored correctly'});
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};