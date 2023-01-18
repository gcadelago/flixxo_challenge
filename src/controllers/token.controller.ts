import { RequestHandler } from 'express';

import { Token } from '../database/models/Token';

export const index: RequestHandler = async (req, res) => {
  try {
    const tokens = await Token.find({
      order: { tkn_id: 'ASC' },
      select: {
        tkn_id: true,
        tkn_name: true,
        tkn_tricker: true,
      }
    });

    return res.status(200).json(tokens);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const show: RequestHandler = async (req, res) => {
  const { tkn_id } = req.params;
  try {
    let token = await Token.findOne({ 
      where: { tkn_id }, 
      select: { 
        tkn_id: true, 
        tkn_name: true, 
        tkn_tricker: true, 
        tkn_trade_url: true, 
        updated_at: true, 
        created_at: true
      }
    });

    return res.status(200).json(token);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const store: RequestHandler = async (req, res) => {
  const { tkn_id, tkn_name, tkn_trade_url, tkn_tricker } = req.body;

  try {
    const newToken = await Token.save({
      tkn_id,
      tkn_name,
      tkn_trade_url,
      tkn_tricker
    });

    return res.status(201).json(newToken);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};

export const update: RequestHandler = async (req, res) => {
  const { tkn_id } = req.params;
  const updatePayload = req.body;

  try {
    const tokenExists = await Token.findOneOrFail({where:{tkn_id}});

    const contentUpdate: Token = {
      ...tokenExists,
      ...updatePayload,
    };

    const content = await Token.save(contentUpdate);

    return res.status(201).json(content);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
};